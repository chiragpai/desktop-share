import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

import { TextReceiverComponent } from './grid/text-receiver/text-receiver.component';
import { FileReceiverComponent } from './grid/file-receiver/file-receiver.component';
import { HttpClientModule } from '@angular/common/http';
import { TextReceivedSuccessComponent } from './dialog/text-received-success/text-received-success.component';
import { FileReceivedSuccessComponent } from './dialog/file-received-success/file-received-success.component';
import { InfoComponent } from './dialog/info/info.component';
import { GridMainComponent } from './grid/grid-main/grid-main.component';
import { CastComponent } from './pages/cast/cast.component';
import { CastReceiverComponent } from './pages/cast-receiver/cast-receiver.component';

@NgModule({
  declarations: [
    AppComponent,
    TextReceiverComponent,
    FileReceiverComponent,
    TextReceivedSuccessComponent,
    FileReceivedSuccessComponent,
    InfoComponent,
    GridMainComponent,
    CastComponent,
    CastReceiverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatInputModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
