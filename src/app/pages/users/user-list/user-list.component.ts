import {Component, Inject, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/services/api.service";
import {AppComponent} from "../../../app.component";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {StructureObject} from "../../../shared/interfaces/structure";
import {PermissionDialogComponent} from "../../admin/permissions/permissions.component";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(
    private api: ApiService,
    private app: AppComponent,
    private dialog: MatDialog
  ) { }
  // @ts-ignore
  structure: StructureObject;
  // @ts-ignore
  structureSrc: StructureObject;
  search: any;
  async ngOnInit(): Promise<void> {
    this.app.loading = true;
    this.structure = await this.api.getStructure().toPromise();
    this.structureSrc = JSON.parse(JSON.stringify(this.structure));
    this.app.loading = false;
  }
  filter(s: any): void {
    this.structureSrc.data = JSON.parse(
      JSON.stringify(
        this.structure.data.filter((e) =>
          !!s
            ? e.name.toLocaleLowerCase().includes(s.toLowerCase()) ||
            e.manages.some((e) =>
              e.name.toLowerCase().includes(s.toLowerCase())
            ) ||
            e.manages.some((e) =>
              e.units.some((e2) =>
                e2.name.toLowerCase().includes(s.toLowerCase())
              )
            ) ||
            e.manages.some((e) =>
              e.units.some((e2) =>
                e2.postions.some((e3) =>
                  e3.name.toLowerCase().includes(s.toLowerCase())
                )
              )
            )
            : true
        )
      )
    );
    if (!s) {
      this.structureSrc.data = JSON.parse(JSON.stringify(this.structure.data));
    }
  }
  selectUser(data: any): void {
    const dialogRef = this.dialog.open(UserlistDialogComponent, {
      data: data,
      panelClass: 'dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
@Component({
  selector: 'user-list-dialog',
  template: `<div class="dialog">
    <div class="container-fluid">
     <div class="row panel">
       <div class="col-6">
         <span>Информация о пользователе</span>
       </div>
       <div class="col-6 d-flex flex-row justify-content-end align-items-center">
         <mat-icon class="hover-pointer" [mat-dialog-close]="null">close</mat-icon>
       </div>
     </div>
      <div class="col-12" *ngIf="isEdit && !isDelete">
        <app-user-add-form></app-user-add-form>
        <div class="d-flex flex-row justify-content-between">
          <button class="gov-button_light" (click)="isDelete = true;">Удалить пользователя</button>
          <button class="gov-button">Сохранить</button>
        </div>
      </div>
      <div class="col-12" *ngIf="isDelete">
        <div class="d-flex delete__container align-items-center justify-content-center flex-column">
          <span>Вы действительно хотите удалить пользователя?</span>
          <div class="d-flex flex-column">
            <div class="delete__container__account">
              <span>Петров Иван Иванович</span>
            </div>
            <div class="d-flex flex-row justify-content-between align-items-center">
              <button class="gov-button_light" (click)="isDelete = false">Отмена</button>
              <button class="gov-button" [mat-dialog-close]="null">Удалить</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12" *ngIf="!isEdit && !isDelete">
        <div class="w-100 table-container d-flex flex-column">
          <div class="d-flex row m-0">
            <div class="t-1">
              <span>ФИО</span>
            </div>
            <div class="t-2">
              <span>Петров Иван Иванович</span>
            </div>
          </div>
          <div class="d-flex row m-0">
            <div class="t-1">
              <span>Дата рождения</span>
            </div>
            <div class="t-2">
              <span>Петров Иван Иванович</span>
            </div>
          </div>
          <div class="d-flex row m-0">
            <div class="t-1">
              <span>Организация</span>
            </div>
            <div class="t-2">
              <span>Петров Иван Иванович</span>
            </div>
          </div>
          <div class="d-flex row m-0">
            <div class="t-1">
              <span>Управление</span>
            </div>
            <div class="t-2">
              <span>Петров Иван Иванович</span>
            </div>
          </div>
          <div class="d-flex row m-0">
            <div class="t-1">
              <span>Отдел</span>
            </div>
            <div class="t-2">
              <span>Петров Иван Иванович</span>
            </div>
          </div>
          <div class="d-flex row m-0">
            <div class="t-1">
              <span>Должность</span>
            </div>
            <div class="t-2">
              <span>Петров Иван Иванович</span>
            </div>
          </div>
          <div class="d-flex row m-0">
            <div class="t-1">
              <span>Электронная почта</span>
            </div>
            <div class="t-2">
              <span>Петров Иван Иванович</span>
            </div>
          </div>
          <div class="d-flex row m-0">
            <div class="t-1">
              <span>Номер телефона</span>
            </div>
            <div class="t-2">
              <span>Петров Иван Иванович</span>
            </div>
          </div>
        </div>
        <div class="w-100 list-container d-flex flex-column">
          <mat-checkbox *ngFor="let i of [1, 1, 1, 1, 1, 1, 1, 1]">sf</mat-checkbox>
        </div>
        <div class="w-100 d-flex flex-row justify-content-between">
          <button class="gov-button_light" (click)="isEdit = true">Редактировать</button>
          <button class="gov-button" [mat-dialog-close]="null">Сохранить</button>
        </div>
      </div>
    </div>
  </div>`
})
export class UserlistDialogComponent {
  isEdit = false;
  isDelete = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

}
