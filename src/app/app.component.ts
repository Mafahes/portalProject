import {Component, OnInit} from '@angular/core';
import {ApiService} from "./shared/services/api.service";
import {Observable} from "rxjs";
import {StorageService} from "./shared/injectables/storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private api: ApiService,
    private storage: StorageService
  ) {
    this.data$ = this.storage.user$;
  }
  data$: Observable<string>;
  title = 'angularProject';
  ngOnInit() {
  }
}
