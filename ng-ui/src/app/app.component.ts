import { environment } from 'src/environments/environment';
import { InfoComponent } from './dialog/info/info.component';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-ui';

  public host = environment.shareHost;
  public breakpoint = 2;

  constructor(private dialog:MatDialog) {
  }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 500) ? 1 : 2;
  }

  openInfo() {
    this.dialog.open(InfoComponent);
  }

  onResize(event: Event) {
    console.log(event);
    // @ts-ignore
    this.breakpoint = (event.target?.innerWidth <= 500) ? 1 : 2;
  }

}
