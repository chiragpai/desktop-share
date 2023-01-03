import { FileReceivedSuccessComponent } from './../../dialog/file-received-success/file-received-success.component';
import { MatDialog } from '@angular/material/dialog';
import { FileReceivedResponse } from './../../models/file-received-response';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-receiver',
  templateUrl: './file-receiver.component.html',
  styleUrls: ['./file-receiver.component.css']
})
export class FileReceiverComponent implements OnInit {

  public selectedFile = "...";
  private uploadFile!: File;

  public percentDone = 0;

  constructor(private httpClient: HttpClient, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  handleFileSelection(fileInputEvent: Event) {
    // @ts-ignore
    console.log(fileInputEvent);
    // @ts-ignore
    this.uploadFile = fileInputEvent.target?.files[0];
    this.selectedFile = this.uploadFile?.name;
  }

  handleFileUpload() {
    if (this.uploadFile) {
      this.percentDone = 0;
      let formData: FormData = new FormData();
      formData.append('uploaded_file', this.uploadFile, this.uploadFile.name);
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      this.httpClient.post(environment.shareHost + "/files", formData, {
        headers: headers,
        reportProgress: true,
        observe: 'events'
      }).subscribe({
        next: event => {
          if (event.type === HttpEventType.UploadProgress) {
            if (event.total) {
              this.percentDone = Math.round(100 * event.loaded / event.total);
            }
          } else if(event.type === HttpEventType.Response) {
            console.log(event);
            if(event.body) {
              // @ts-ignore
              let fresp: FileReceivedResponse = event.body;
              console.log(fresp);
              this.dialog.open(FileReceivedSuccessComponent, {
                data: fresp,
                minWidth: "50%"
              });
            }
          }
        },
        error: err => {
          console.log(err);
        }
      })
    } else {
      alert("Choose a file to continue...")
    }
  }

}
