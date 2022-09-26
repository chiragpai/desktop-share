import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-receiver',
  templateUrl: './file-receiver.component.html',
  styleUrls: ['./file-receiver.component.css']
})
export class FileReceiverComponent implements OnInit {

  public selectedFile = "...";

  constructor() { }

  ngOnInit(): void {
  }

  handleFileUpload(fileInputEvent: Event) {
    // @ts-ignore
    console.log(fileInputEvent.target?.files);
    // @ts-ignore
    this.selectedFile = fileInputEvent.target?.files[0];
  }

}
