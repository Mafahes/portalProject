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
import { MainPageComponent } from './pages/main/main-page/main-page.component';
import { FileUploadingComponent } from './pages/fileUploading/file-uploading/file-uploading.component';
import {MatIconModule} from "@angular/material/icon";
import { PermissionsComponent } from './pages/admin/permissions/permissions.component';
import {InfoResourcesComponent, ResourcesDialogComponent} from './pages/admin/info-resources/info-resources.component';
import { StructureComponent } from './pages/admin/structure/structure.component';
import {MatDialogModule} from "@angular/material/dialog";

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
    MainPageComponent,
    FileUploadingComponent,
    PermissionsComponent,
    InfoResourcesComponent,
    StructureComponent,
    ResourcesDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
