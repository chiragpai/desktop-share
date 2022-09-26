import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-ui';

  public host = window.location.host;
  public breakpoint = 2;

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 500) ? 1 : 2;
  }

  onResize(event: Event) {
    console.log(event);
    // @ts-ignore
    this.breakpoint = (event.target?.innerWidth <= 500) ? 1 : 2;
  }

}
