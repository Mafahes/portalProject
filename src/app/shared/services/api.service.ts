import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_LINK} from "../config";

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
}
