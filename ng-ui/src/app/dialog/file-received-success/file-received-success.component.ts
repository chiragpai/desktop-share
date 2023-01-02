import { FileReceivedResponse } from './../../models/file-received-response';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-file-received-success',
  templateUrl: './file-received-success.component.html',
  styleUrls: ['./file-received-success.component.css']
})
export class FileReceivedSuccessComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: FileReceivedResponse) {
    console.log(data);
  }

  ngOnInit(): void {
  }

}
