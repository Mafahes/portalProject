import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {ReportsComponent} from "./pages/reports/reports.component";
import {UserListComponent} from "./pages/users/user-list/user-list.component";
import {UserAddComponent} from "./pages/users/user-add/user-add.component";
import {MainPageComponent} from "./pages/main/main-page/main-page.component";
import {FileUploadingComponent} from "./pages/fileUploading/file-uploading/file-uploading.component";
import {PermissionsComponent} from "./pages/admin/permissions/permissions.component";
import {InfoResourcesComponent} from "./pages/admin/info-resources/info-resources.component";
import {StructureComponent} from "./pages/admin/structure/structure.component";

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'auth', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/add', component: UserAddComponent },
  { path: 'upload', component: FileUploadingComponent },
  { path: 'permissions', component: PermissionsComponent },
  { path: 'resources', component: InfoResourcesComponent },
  { path: 'structure', component: StructureComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
