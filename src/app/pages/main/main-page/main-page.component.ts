import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import {StorageService} from "../../../shared/injectables/storage.service";
import {Resource} from "../../../shared/interfaces/resource";
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(
    private storage: StorageService
  ) {
  }
  isOms = false;
  isAdmin = true;
  resources: Resource[][] = [];
  async ngOnInit(): Promise<void> {
    this.storage.resource$.subscribe((i) => {
      this.resources = _.chunk(i.data, 4);
      console.log(this.resources);
    })
  }

}
