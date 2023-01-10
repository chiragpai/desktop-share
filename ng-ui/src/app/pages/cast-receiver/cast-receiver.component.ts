import { Message } from './../../models/message';
import { WebsocketService } from './../../services/websocket.service';
import { Component, OnInit } from '@angular/core';
// @ts-ignore
import { v4 as uuid } from "uuid";

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

  constructor(private websocketService: WebsocketService) {
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

  receiveStream(source: string) {
    const rteData = this.received.find(d => d.source === source);
    // @ts-ignore
    const candidate = new RTCSessionDescription(rteData);
    console.log(candidate);
    if(rteData) {
      this.websocketService.messages.next({
        source: rteData.source,
        content: "answer",
        type: candidate.type,
        sdp: candidate.sdp
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
