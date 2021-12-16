import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-info-resources',
  templateUrl: './info-resources.component.html',
  styleUrls: ['./info-resources.component.scss']
})
export class InfoResourcesComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }
  addResource(): void {
    const dialogRef = this.dialog.open(ResourcesDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
@Component({
  selector: 'app-resources-dialog',
  styleUrls: ['./info-resources.component.scss'],
  template: `<div class="container-fluid dialog">
    <input hidden type="file" #uploader (change)="onUpload($event)"/>
    <div class="row">
      <span style="width: fit-content">Добавить информационный ресурс</span>
      <svg-icon src="assets/icons/cross_dark.svg" [mat-dialog-close]="null" style="width: 52px" [svgStyle]="{ 'width.px':30 }"></svg-icon>
    </div>
    <div *ngIf="!file" class="row filePicker d-flex flex-row justify-content-center align-items-center">
      <button class="gov-button_light" (click)="uploader.click()">Выбрать файл</button>
      <span>Файл не выбран</span>
    </div>
    <div *ngIf="!!file" class="row filePicker d-flex flex-row justify-content-center align-items-center">
      <img width="40" height="40" [src]="fileHash"/>
      <div class="d-flex flex-column fileName">
        <span>{{file.name.split('.')[0]}}</span>
        <span>{{file.name.split('.')[file.name.split('.').length - 1]}} {{(file?.size / (1024*1024)).toFixed(2)}} МБ</span>
      </div>
      <mat-icon class="hover-pointer" (click)="file = null">close</mat-icon>
    </div>
    <div class="d-flex flex-column align-items-center link">
      <span>Ссылка на информационный ресурс:</span>
      <input [(ngModel)]="link" class="gov-input"/>
    </div>
    <div class="d-flex flex-column justify-content-center align-items-center">
      <button class="gov-button" [mat-dialog-close]="{link, file}" [disabled]="!link || !file">Добавить</button>
    </div>
  </div>`
})
export class ResourcesDialogComponent {
  constructor() {
  }
  file: any = null;
  fileHash: any = null;
  link = '';
  onUpload(e: any): void {
    if (!!e.target.files.length) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        this.fileHash = reader.result;
      };
      this.file = e.target.files[0];
    }
  }
}
