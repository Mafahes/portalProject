import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-uploading',
  templateUrl: './file-uploading.component.html',
  styleUrls: ['./file-uploading.component.scss']
})
export class FileUploadingComponent implements OnInit {

  constructor() { }
  file: any;
  ngOnInit(): void {
  }
  onUpload(e: any): void {
    if(!!e.target.files) {
      this.file = e.target.files[0];
    }
  }
  removeFile(): void {
    this.file = null;
  }


}
