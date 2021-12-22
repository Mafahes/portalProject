import {NgModule, Provider} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginComponent, LoginDialogComponent} from './pages/login/login.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import {AngularSvgIconModule} from "angular-svg-icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProfileComponent } from './pages/profile/profile.component';
import { ReportsComponent } from './pages/reports/reports.component';
import {
  UserListComponent,
  UserlistDialogComponent
} from './pages/users/user-list/user-list.component';
import { UserAddComponent } from './pages/users/user-add/user-add.component';
import {NgSelectModule} from "@ng-select/ng-select";
import { MainPageComponent } from './pages/main/main-page/main-page.component';
import { FileUploadingComponent } from './pages/fileUploading/file-uploading/file-uploading.component';
import {MatIconModule} from "@angular/material/icon";
import {PermissionDialogComponent, PermissionsComponent} from './pages/admin/permissions/permissions.component';
import {InfoResourcesComponent, ResourcesDialogComponent} from './pages/admin/info-resources/info-resources.component';
import { StructureComponent } from './pages/admin/structure/structure.component';
import {MatDialogModule} from "@angular/material/dialog";
import {HttpInterceptor} from "./shared/interceptor/http.interceptor";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { UserAddFormComponent } from './shared/components/user-add-form/user-add-form.component';
import {Ng2SmartTableModule} from "ng2-smart-table";
import {DatePipe} from "@angular/common";
import { ReportSearchPipe } from './pages/reports/report-search.pipe';
const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpInterceptor,
  multi: true
};
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
    ResourcesDialogComponent,
    LoginDialogComponent,
    PermissionDialogComponent,
    UserlistDialogComponent,
    UserAddFormComponent,
    ReportSearchPipe
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
        MatDialogModule,
        MatExpansionModule,
        MatCheckboxModule,
        Ng2SmartTableModule
    ],
  providers: [
    INTERCEPTOR_PROVIDER,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
