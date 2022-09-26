import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';

import { TextReceiverComponent } from './grid/text-receiver/text-receiver.component';
import { FileReceiverComponent } from './grid/file-receiver/file-receiver.component';
import { HttpClientModule } from '@angular/common/http';
import { TextReceivedSuccessComponent } from './dialog/text-received-success/text-received-success.component';

@NgModule({
  declarations: [
    AppComponent,
    TextReceiverComponent,
    FileReceiverComponent,
    TextReceivedSuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule,
    MatDialogModule,
    MatProgressBarModule,
    MatInputModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
