import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TextReceivedSuccessComponent } from 'src/app/dialog/text-received-success/text-received-success.component';

@Component({
  selector: 'app-text-receiver',
  templateUrl: './text-receiver.component.html',
  styleUrls: ['./text-receiver.component.css']
})
export class TextReceiverComponent implements OnInit {

  text: string | undefined;

  constructor(private httpClient:HttpClient, private dialog:MatDialog) {
   }

  ngOnInit(): void {
  }

  sendText(): void {
    let body = {
      "text": this.text
    }
    this.httpClient.post("http://" + window.location.hostname +":8080/text", body).subscribe({
      next: response => {
        console.log("Completed", response);
        this.dialog.open(TextReceivedSuccessComponent, {
          data: response,
          minWidth: "50%"
        });
      },
      error: err => {
        console.log("Error");
      }
    });
  }

}
