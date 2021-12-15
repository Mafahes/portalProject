import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../injectables/storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public storage: StorageService
  ) { }
  self = false;
  ngOnInit(): void {
  }

}
