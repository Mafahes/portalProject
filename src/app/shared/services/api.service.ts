import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { API_LINK } from '../config';
import { ResourceData } from '../interfaces/resource';
import { User } from '../interfaces/user';
import { File } from '../interfaces/file';
import {Scheme, StructureObject} from '../interfaces/structure';
import {delay, map} from 'rxjs/operators';
import {Mo, MoV2, Org} from "../interfaces/mo";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  authToken(data: any): Observable<any> {
    return this.http.post<any>(`${API_LINK}auth/login`, data);
  }
  uploadFile(data: any): Observable<File[]> {
    return this.http.post<File[]>(`${API_LINK}api/appfiles`, data);
  }
  getSelf(): Observable<User> {
    return this.http.get<User>(`${API_LINK}api/user/0`);
  }
  getResources(): Observable<ResourceData> {
    return this.http.get<ResourceData>(`${API_LINK}api/resourcelinks/all`);
  }
  createResource(data: any): Observable<any> {
    return this.http.post<any>(`${API_LINK}api/resourcelinks`, data);
  }
  updateResource(data: any): Observable<any> {
    return this.http.put<any>(`${API_LINK}api/resourcelinks`, data);
  }
  deleteResource(id: any): Observable<any> {
    return this.http.delete<any>(`${API_LINK}api/resourcelinks?id=${id}`);
  }
  getStructure(withHiddedToggle = false): Observable<StructureObject> {
    return this.http
      .get<StructureObject>(`${API_LINK}api/organizations/all`)
      .pipe(
        map((e) =>
          ({...e, data: e.data.map((e2) => ({
              ...e2,
              hide: true,
              manages: e2.manages.map((e3) => ({
                ...e3,
                hide: true,
                units: e3.units.map((e4) => ({
                  ...e4,
                  hide: true,
                  postions: e4.postions.map((e5) => ({ ...e5, hide: false })),
                })),
              })),
            }))})
        )
      );
  }
  getOrgSchemeById(id: any): Observable<Scheme> {
    return this.http.get<Scheme>(`${API_LINK}api/organizations/${id}`);
  }
  createOrgScheme(data: any): Observable<any> {
    return this.http.post<any>(`${API_LINK}api/organizations`, data);
  }
  updateOrgScheme(data: any): Observable<any> {
    return this.http.put<any>(`${API_LINK}api/organizations`, data);
  }
  deleteOrgScheme(id: any): Observable<any> {
    return this.http.delete<any>(`${API_LINK}api/organizations?id=${id}`);
  }
  getTypeMO(): Observable<Mo[]> {
    return of([
      {id: 1, name: 'ЦРБ и УБ'},
      {id: 2, name: 'Махачкалинские МО'},
      {id: 3, name: 'ЦГБ'}
    ])
  }
  getTypeMOV2(): Observable<MoV2[]> {
    return of([
      {
        "nummer": 1,
        "date": "2021-08-03T00:00:00",
        "typeMO": "Частные МО",
        "nameMO": "\"Парус\", г. Махачкала",
        "status": "сдан"
      },
      {
        "nummer": 2,
        "date": "2021-08-01T00:00:00",
        "typeMO": "Частные МО",
        "nameMO": "\"Дентал Люкс\", с. Маджалис",
        "status": "сдан"
      },
      {
        "nummer": 3,
        "date": "2021-08-05T00:00:00",
        "typeMO": "Частные МО",
        "nameMO": "\"МЦ Здоровье\", г. Махачкала",
        "status": "сдан"
      },
      {
        "nummer": 4,
        "date": "2021-08-06T00:00:00",
        "typeMO": "ЦРБ и УБ",
        "nameMO": "Ахвахская ЦРБ",
        "status": "сдан"
      },
      {
        "nummer": 5,
        "date": "2021-08-05T00:00:00",
        "typeMO": "Частные МО",
        "nameMO": "\"МЦ Здоровье\", г. Махачкала",
        "status": "сдан"
      },
      {
        "nummer": 6,
        "date": "2021-08-05T00:00:00",
        "typeMO": "ЦРБ и УБ",
        "nameMO": "Бабаюртовская ЦРБ",
        "status": "сдан"
      },
      {
        "nummer": 7,
        "date": "2021-08-05T00:00:00",
        "typeMO": "ЦРБ и УБ",
        "nameMO": "Бабаюртовская ЦРБ",
        "status": "сдан"
      },
      {
        "nummer": 8,
        "date": "2021-08-05T00:00:00",
        "typeMO": "ЦРБ и УБ",
        "nameMO": "Бабаюртовская ЦРБ",
        "status": "сдан"
      },
      {
        "nummer": 9,
        "date": "2021-08-05T00:00:00",
        "typeMO": "Частные МО",
        "nameMO": "\"Галактика\", г. Махачкала",
        "status": "сдан"
      },
      {
        "nummer": 10,
        "date": "2021-08-05T00:00:00",
        "typeMO": "Частные МО",
        "nameMO": "\"Патогистологический центр\", г. Махачкала",
        "status": "сдан"
      }
    ]).pipe(
      delay(700)
    )
  }
  getOrg(): Observable<Org[]> {
    return of([
      {
        id: 672,
        mcod: '051301',
        glpu: '051301',
        idump: 1,
        urop: 1,
        krai: '013',
        name: 'Бабаюртовская ЦРБ',
        m_namef: 'ГОСУДАРСТВЕННОЕ БЮДЖЕТНОЕ УЧРЕЖДЕНИЕ РЕСПУБЛИКИ ДАГЕСТАН БАБАЮРТОВКАЯ ЦЕНТРАЛЬНАЯ РАЙОННАЯ БОЛЬНИЦА',
        m_ogrn: '1020501443863',
        m_adres: '368060, РД, Бабаюртовский р-он, с. Бабаюрт, ул. И.Казака, 13',
        fam_gv: "ДУГУЖЕВ",
        grup: 1
      }
    ]).pipe(
      delay(700)
    );
  }
  createExcel(json: any[], excelFileName: string): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';

    const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const myworkbook: XLSX.WorkBook = { Sheets: { 'data': myworksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, excelFileName + EXCEL_EXTENSION);
  }
}
