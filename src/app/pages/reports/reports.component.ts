import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../shared/services/api.service";
import {map} from "rxjs/operators";
import {forkJoin} from "rxjs";
import {MoV2, Org} from "../../shared/interfaces/mo";
import {DatePipe} from "@angular/common";
import {LocalDataSource} from "ng2-smart-table";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  constructor(
    private api: ApiService,
    private datePipe: DatePipe,
    private app: AppComponent
  ) { }
  hidden: boolean[] = [
    true,
    false,
    false,
    false
  ]
  searchField = '';
  sort: any = [-1, true];
  selectedIndex = -1;
  fileType1: MoV2[] = [];
  source: LocalDataSource = new LocalDataSource()
  tableConfig = {
    actions: false,
    mode: 'external',
    columns: {
      nummer: {
        title: '№',
        filter: false,
        sort: false,
      },
      date: {
        title: 'Дата счета',
        filter: false,
        sort: false,
        valuePrepareFunction: (cell: any, row: any) => {
          return this.datePipe.transform(cell, 'dd.MM.yyyy')
        }
      },
      typeMO: {
        title: 'Вид МО',
        filter: false,
        sort: false
      },
      nameMO: {
        title: 'Наименование МО',
        filter: false,
        sort: false,
      },
      status: {
        title: 'Статус',
        filter: false,
        sort: false,
      }
    }
  };
  ngOnInit(): void {
  }
  switchSort(index: number): void {
    this.sort = [index, this.sort[0] === index ? this.sort[1] === true ? false : true : false];
    console.log(this.sort);
    switch (this.sort[0]) {
      case 0: {
        this.source.load(
          this.fileType1.sort((a, b) => this.sort[1] ? a.typeMO.replace("\"", '').localeCompare(b.typeMO) : b.typeMO.replace("\"", '').localeCompare(a.typeMO)));
        break;
      }
      case 1: {
        this.source.load(
          this.fileType1.sort((a, b) => this.sort[1] ? a.nameMO.split('"').join('').localeCompare(b.nameMO) : b.nameMO.split('"').join('').replace("\"", '').localeCompare(a.nameMO.split('"').join(''))));
        break;
      }
      case 2: {
        this.source.load(
          this.fileType1.sort((a, b) => this.sort[1] ? a.status.replace("\"", '').localeCompare(b.status) : b.status.replace("\"", '').localeCompare(a.status)));
        break;
      }
    }
  }
  async onDocSelect(index: number): Promise<void> {
    this.selectedIndex = index;
    this.fileType1 = await this.api.getTypeMOV2().toPromise();
    this.source.load(this.fileType1);
  }
  async saveExcel(): Promise<void> {
    this.api.createExcel(this.fileType1.map((e) => (
      {
        '№': e.nummer,
        'Дата счета': this.datePipe.transform(e.date, 'dd.mm.YYYY'),
        'Вид МО': e.typeMO,
        'Наименование МО': e.nameMO,
        'Статус': e.status
      }
    )), `Отчет по счетам ${this.datePipe.transform(new Date(), 'dd.MM.yyyy HH:mm')}`);
  }
}
