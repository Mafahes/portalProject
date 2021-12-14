import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../../shared/services/api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private api: ApiService
  ) { }
  authForm = this.fb.group({
    login: '',
    password: ['', Validators.compose([Validators.required, Validators.maxLength(32), Validators.minLength(16)])]
  });
  ngOnInit(): void {
  }
  onSubmit(): void {
    this.api.authToken(this.authForm.value).toPromise();
  }

}
