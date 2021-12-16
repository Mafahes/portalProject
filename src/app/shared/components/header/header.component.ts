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

}
