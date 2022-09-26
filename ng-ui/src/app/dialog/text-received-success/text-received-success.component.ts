import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-text-received-success',
  templateUrl: './text-received-success.component.html',
  styleUrls: ['./text-received-success.component.css']
})
export class TextReceivedSuccessComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log("Dialog", data);
  }

  ngOnInit(): void {
  }

  getTitle(): string {
    if(this.data.clipboardUpdated) {
      return "Clipboard updated";
    } else {
      return "Clipboard not updated"
    }
  }

}
