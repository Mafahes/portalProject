import {Component, OnInit} from '@angular/core';
import {ApiService} from "./shared/services/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private api: ApiService
  ) {
  }
  title = 'angularProject';
  ngOnInit() {
    this.api.authToken({a: 2}).subscribe(e => {
      console.log(e);
    });
  }
}
