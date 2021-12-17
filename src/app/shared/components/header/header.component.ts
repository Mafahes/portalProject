import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../injectables/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public storage: StorageService,
    public router: Router
  ) { }
  isAdmin = true;
  ngOnInit(): void {
  }
  logOut(): void {
    document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.storage.setData('user', null);
    this.router.navigate(['/auth']);
  }
}
