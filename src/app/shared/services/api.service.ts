import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_LINK } from '../config';
import { ResourceData } from '../interfaces/resource';
import { User } from '../interfaces/user';
import { File } from '../interfaces/file';
import {Scheme, StructureObject} from '../interfaces/structure';
import { map } from 'rxjs/operators';

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
}
