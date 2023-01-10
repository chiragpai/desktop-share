import { Message } from './../../models/message';
import { WebsocketService } from './../../services/websocket.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
// @ts-ignore
import { v4 as uuid } from "uuid";

enum CastType {
  CAMERA, SCREEN
}

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.css']
})
export class CastComponent implements OnInit, OnDestroy {

  private stream?: MediaStream;

  id = uuid();

  broadcastIntervalId: any;

  configuration: RTCConfiguration = {
    iceServers: [
      {
        urls: [
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };

  private rtcPeerConnection: RTCPeerConnection;
  private offerDescription?: RTCSessionDescriptionInit;

  constructor(private snackBar: MatSnackBar, private websocketService: WebsocketService) {
    this.rtcPeerConnection = new RTCPeerConnection(this.configuration);
    this.rtcPeerConnection.onicecandidate = event => {
      console.log(event);
    }
    this.createOffer();
    this.websocketService.messages.subscribe(msg => {
      // @ts-ignore
      if (msg.content === 'answer' && (msg.source == this.id)) {
        console.log("Received stream answer", msg);
        this.rtcPeerConnection.setRemoteDescription(msg as any);
      }
    });
  }

  async createOffer() {
    this.offerDescription = await this.rtcPeerConnection.createOffer();
    console.log("Creating RTC Offer", this.offerDescription);
    await this.rtcPeerConnection.setLocalDescription(this.offerDescription);
  }

  ngOnDestroy(): void {
    clearInterval(this.broadcastIntervalId);
  }

  ngOnInit(): void {
    this.broadcastIntervalId = setInterval(() => {
      this.sendMsg("broadcast", this.offerDescription);
    }, 5000);
  }

  sendMsg(content: string, offerDescription?: RTCSessionDescriptionInit) {
    let message: Message = {
      source: '',
      content: '',
      type: offerDescription?.type,
      sdp: offerDescription?.sdp
    };
    message.source = this.id;
    message.content = content;
    this.websocketService.messages.next(message);
  }

  copyIdToClipboard() {
    navigator.clipboard.writeText(this.id);
    this.snackBar.open("Copied", undefined, { duration: 5000 });
  }

  startStream(type: CastType) {
    const mediaElement = document.querySelector("#mediaStream");
    if (type == CastType.CAMERA) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(
        (stream) => {
          this.stream = stream;
          // @ts-ignore
          mediaElement.srcObject = stream;
          // @ts-ignore
          mediaElement.play();
          mediaElement?.classList.add("media-active");
        }
      )
    } else {
      navigator.mediaDevices.getDisplayMedia({ video: true }).then(
        (stream) => {
          this.stream = stream;
          // @ts-ignore
          mediaElement.srcObject = stream;
          // @ts-ignore
          mediaElement.play();
          mediaElement?.classList.add("media-active");
        }
      )
    }
  }

  stopStream() {
    const mediaElement = document.querySelector("#mediaStream");
    mediaElement?.classList.remove("media-active");
    this.stream?.getTracks().forEach(track => track.stop());
  }

}
