import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import {AngularSvgIconModule} from "angular-svg-icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProfileComponent } from './pages/profile/profile.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { UserAddComponent } from './pages/users/user-add/user-add.component';
import {NgSelectModule} from "@ng-select/ng-select";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    ReportsComponent,
    UserListComponent,
    UserAddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
