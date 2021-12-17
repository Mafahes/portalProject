import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../shared/injectables/storage.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    public storage: StorageService
  ) { }

  ngOnInit(): void {
  }

}
