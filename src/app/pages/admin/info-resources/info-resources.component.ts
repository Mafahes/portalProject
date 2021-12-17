import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../../shared/services/api.service";
import {StorageService} from "../../../shared/injectables/storage.service";
import {Resource} from "../../../shared/interfaces/resource";

@Component({
  selector: 'app-info-resources',
  templateUrl: './info-resources.component.html',
  styleUrls: ['./info-resources.component.scss']
})
export class InfoResourcesComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    public storage: StorageService
  ) { }

  ngOnInit(): void {
  }
  changeResource(e: Resource): void {
    fetch('https://users.3dcafe.ru/upload/' + e.file.fileName)
      .then(res => res.blob()) // Gets the response and returns it as a blob
      .then(blob => {
        const dialogRef = this.dialog.open(ResourcesDialogComponent, {
          data: {
            link: e.link,
            file: blob
          }
        });
        dialogRef.afterClosed().subscribe(async (result) => {
          if(result === false) {
            await this.api.deleteResource(e.id).toPromise();
            this.storage.setData('res', (await this.api.getResources().toPromise()));
          }
          if(result !== false && result !== null) {
            console.log(result);
            const fd = new FormData();
            fd.append('uploadedFiles', new File([result.file], "image.png"));
            var file = await this.api.uploadFile(fd).toPromise();
            await this.api.updateResource({
              id: e.id,
              fileId: file[0].id,
              link: result.link
            }).toPromise();
            this.storage.setData('res', (await this.api.getResources().toPromise()));
          }
        })
      });
  }
  addResource(): void {
    const dialogRef = this.dialog.open(ResourcesDialogComponent);

    dialogRef.afterClosed().subscribe(async (result) => {
      const fd = new FormData();
      fd.append('uploadedFiles', result.file);
      var file = await this.api.uploadFile(fd).toPromise();
      await this.api.createResource({
        link: result.link,
        fileId: file[0].id
      }).toPromise();
      this.storage.setData('res', (await this.api.getResources().toPromise()));
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
      <span style="width: fit-content">{{!!data ? 'Изменить' : 'Добавить'}} информационный ресурс</span>
      <svg-icon src="assets/icons/cross_dark.svg" [mat-dialog-close]="null" style="width: 52px" [svgStyle]="{ 'width.px':30 }"></svg-icon>
    </div>
    <div *ngIf="!file" class="row filePicker d-flex flex-row justify-content-center align-items-center">
      <button class="gov-button_light" (click)="uploader.click()">Выбрать файл</button>
      <span>Файл не выбран</span>
    </div>
    <div *ngIf="!!file" class="row filePicker d-flex flex-row justify-content-center align-items-center">
      <img width="40" height="40" [src]="fileHash"/>
      <div class="d-flex flex-column fileName">
        <span>{{file?.name?.split('.')[0] || ''}}</span>
        <span>{{file?.name?.split('.')[file.name.split('.').length - 1]}} {{(file?.size / (1024*1024)).toFixed(2)}} МБ</span>
      </div>
      <mat-icon class="hover-pointer" (click)="file = null">close</mat-icon>
    </div>
    <div class="d-flex flex-column justify-content-center align-items-center link">
      <span>Ссылка на информационный ресурс:</span>
      <input [(ngModel)]="link" class="gov-input"/>
    </div>
    <div *ngIf="!data" class="d-flex flex-column justify-content-center align-items-center">
      <button class="gov-button" [mat-dialog-close]="{link, file}" [disabled]="!link || !file">Добавить</button>
    </div>
    <div *ngIf="!!data" class="d-flex flex-row justify-content-between align-items-center">
      <button class="gov-button_light" [mat-dialog-close]="false">Удалить ресурс</button>
      <button class="gov-button" [mat-dialog-close]="{link, file}" [disabled]="!link || !file">Сохранить</button>
    </div>
  </div>`
})
export class ResourcesDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if(!!this.data) {
      this.file = this.data.file;
      this.link = this.data.link;
      var reader = new FileReader();
      reader.readAsDataURL(this.data.file);
      reader.onload = () => {
        this.fileHash = reader.result;
      };
    }
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
