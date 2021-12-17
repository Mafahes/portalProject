import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_LINK} from "../config";
import {ResourceData} from "../interfaces/resource";
import {User} from "../interfaces/user";
import {File} from "../interfaces/file";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }
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
}
