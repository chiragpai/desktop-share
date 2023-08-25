import { Message } from './../../models/message';
import { WebsocketService } from './../../services/websocket.service';
import { Component, OnInit } from '@angular/core';
// @ts-ignore
import { v4 as uuid } from "uuid";
import Peer from 'peerjs';

@Component({
  selector: 'app-cast-receiver',
  templateUrl: './cast-receiver.component.html',
  styleUrls: ['./cast-receiver.component.css']
})
export class CastReceiverComponent implements OnInit {

  private id = uuid();

  received: Message[] = [];
  sent: any[] = [];

  casts: string[] = [];

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

  private peer: Peer;

  constructor(private websocketService: WebsocketService) {
    this.peer = new Peer();
    this.peer.on('open', (id) => {
      console.log("Peer connection open with id", this.id = id);
    });
    this.peer.on('call', (call) => {
      // Answer the call, providing our mediaStream
      call.answer();
      call.on("stream", (stream) => {
        const mediaElement = document.querySelector("#mediaStream");
        // @ts-ignore
        mediaElement.srcObject = stream;
        // @ts-ignore
        mediaElement.play();
        mediaElement?.classList.add("media-active");
      });
    });
    this.rtcPeerConnection = new RTCPeerConnection(this.configuration);
    this.rtcPeerConnection.onicecandidate = event => {
      console.log("Ice candidate", event);
    }
    this.websocketService.messages.subscribe(msg => {
      // @ts-ignore
      if (msg.source !== this.id) {
        if (msg.content === 'broadcast') {
          if (this.casts.indexOf(msg.source) < 0) {
            this.casts.push(msg.source);
            this.received.push(msg);
          }
        }
      }
    });
  }

  private async createOffer() {
    this.offerDescription = await this.rtcPeerConnection.createOffer();
    console.log("Creating RTC Offer", this.offerDescription);
    await this.rtcPeerConnection.setLocalDescription(this.offerDescription);
  }

  async receiveStream(source: string) {
    const rteData = this.received.find(d => d.source === source);
    // @ts-ignore
    const candidate = new RTCSessionDescription(rteData);
    this.rtcPeerConnection.setRemoteDescription(candidate);
    console.log(candidate);
    const answerDescription = await this.rtcPeerConnection.createAnswer();
    await this.rtcPeerConnection.setLocalDescription(answerDescription);
    if (rteData) {
      this.websocketService.messages.next({
        source: rteData.source,
        content: "answer",
        type: answerDescription.type,
        sdp: answerDescription.sdp,
        destination: this.peer.id
      });
    }
  }

  ngOnInit(): void {
  }

  sendMsg(content: string) {
    let message = {
      source: '',
      content: ''
    };
    message.source = this.id;
    message.content = content;
    // @ts-ignore
    this.sent.push(message);
    this.websocketService.messages.next(message);
  }

}
