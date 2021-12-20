import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder} from "@angular/forms";
import {StructureObject} from "../../../shared/interfaces/structure";
import {ApiService} from "../../../shared/services/api.service";
import {AppComponent} from "../../../app.component";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
export enum PermTypes {
  organization,
  manages,
  units,
  postions
}
@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {

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
  isRoleAdmin = false;
  async ngOnInit(): Promise<void> {
    this.app.loading = true;
    this.structure = await this.api.getStructure().toPromise();
    this.structureSrc = JSON.parse(JSON.stringify(this.structure));
    this.app.loading = false;
  }
  selectPerm(perm: PermTypes, id: number, label: string): void {
    const dialogRef = this.dialog.open(PermissionDialogComponent, {
      data: {
        id,
        label
      },
      panelClass: 'dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  };
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

}
@Component({
  selector: 'dialog-permission-app',
  template: `
  <div class="d-flex h-100 flex-column">
    <div class="d-flex flex-row justify-content-between align-items-center">
      <span>Разрешения {{data.label}}</span>
      <mat-icon [mat-dialog-close]="null">close</mat-icon>
    </div>
    <div class="list-container d-flex flex-column">
      <mat-checkbox color="primary" *ngFor="let item of [1, 2, 3, 4, 5, 6, 7, 1, 2, 3]">Главная</mat-checkbox>
    </div>
    <div class="d-flex flex-row align-items-center justify-content-center">
      <button class="gov-button" [mat-dialog-close]="null">Сохранить</button>
    </div>
  </div>`
})
export class PermissionDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

}
