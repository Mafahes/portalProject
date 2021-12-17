import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../../shared/services/api.service";
import {MatDialog} from "@angular/material/dialog";
import {StorageService} from "../../shared/injectables/storage.service";
import {AppComponent} from "../../app.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private dialog: MatDialog,
    private storage: StorageService,
    private app: AppComponent,
    private router: Router
  ) { }
  authForm = this.fb.group({
    login: '',
    password: ['', Validators.compose([Validators.required, Validators.maxLength(32), Validators.minLength(16)])]
  });
  ngOnInit(): void {
  }
  onSubmit(): void {
    this.app.loading = true;
    this.api.authToken(this.authForm.value).subscribe(async (res) => {
      this.app.loading = false;
      document.cookie = `token=${res.text}; path=/; expires=Tue, ${new Date(new Date().setMonth(new Date().getMonth() + 1))}`
      await this.app.parseData();
      this.router.navigate(['/']);
    }, error => {
      this.app.loading = false;
      if(error.status === 400) {
        const ref = this.dialog.open(LoginDialogComponent, {
          panelClass: 'd-container'
        });
      }
    });
  }

}
@Component({
  selector: 'app-login-dialog',
  styleUrls: ['./login.component.scss'],
  template: `<div class="container-fluid dialog">
    <div class="row">
      <div class="col-12 d-flex justify-content-end align-items-end">
        <svg-icon src="assets/icons/cross_dark.svg" [mat-dialog-close]="null" style="width: 30px" [svgStyle]="{ 'width.px':30 }"></svg-icon>
      </div>
    </div>
    <div class="row d-flex justify-content-center align-items-center">
      <span style="width: fit-content" class="error">ОШИБКА</span>
    </div>
    <div class="row d-flex justify-content-center align-items-center">
      <span style="width: fit-content" class="desc">Неверный логин или пароль</span>
    </div>
  </div>`
})
export class LoginDialogComponent {
  constructor() {
  }
}
