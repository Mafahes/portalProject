import {Component, OnInit} from '@angular/core';
import {ApiService} from "./shared/services/api.service";
import {Observable} from "rxjs";
import {StorageService} from "./shared/injectables/storage.service";
import {User} from "./shared/interfaces/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private api: ApiService,
    private storage: StorageService,
    private router: Router
  ) {
    this.data$ = this.storage.user$;
  }
  data$: Observable<User>;
  init = false;
  loading = false;
  async ngOnInit() {
    if(!!document.cookie.includes('token')) {
      await this.parseData();
      this.init = true;
    } else {
      this.init = true;
      this.router.navigate(['/auth']);
    }
  }
  async parseData(): Promise<void> {
    this.storage.setData('user', (await this.api.getSelf().toPromise()));
    this.storage.setData('res', (await this.api.getResources().toPromise()));
  }
}
