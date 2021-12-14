import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  constructor() { }
  users: any[] = [
    {title: '1'},
    {title: '1'},
    {title: '1'},
    {title: '1'}
  ]
  ngOnInit(): void {
  }

}
