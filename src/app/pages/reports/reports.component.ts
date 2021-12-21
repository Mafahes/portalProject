import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../shared/services/api.service";
import {map} from "rxjs/operators";
import {forkJoin} from "rxjs";
import {MoV2, Org} from "../../shared/interfaces/mo";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  constructor(
    private api: ApiService,
    private datePipe: DatePipe
  ) { }
  hidden: boolean[] = [
    true,
    false,
    false,
    false
  ]
  sort: boolean[] = [
    false,
    false,
    false
  ]
  selectedIndex = -1;
  fileType1: MoV2[] = [];
  tableConfig = {
    actions: false,
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
    console.log(index);
    switch (index) {
      case 0: {
        this.fileType1 = this.fileType1.sort((a, b) => a.typeMO.localeCompare(b.typeMO));
        console.log(this.fileType1[0].typeMO);
        break;
      }
      case 1: {
        this.fileType1 = this.fileType1.sort((a, b) => a.nameMO.localeCompare(b.nameMO))
        break;
      }
      case 2: {
        this.fileType1 = this.fileType1.sort((a, b) => a.nameMO.localeCompare(b.nameMO))
        break;
      }
    }
  }
  async onDocSelect(index: number): Promise<void> {
    this.selectedIndex = index;
    this.fileType1 = await this.api.getTypeMOV2().pipe(
      map(e => e.sort((a, b) => a.nameMO.localeCompare(b.nameMO)))
    ).toPromise();
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
