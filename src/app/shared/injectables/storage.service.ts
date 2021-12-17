import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../interfaces/user";
import {ResourceData} from "../interfaces/resource";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  setters: string[] = ['user']

  constructor() {

  }

  private userSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  user$: Observable<User> = this.userSubject.asObservable();

  private resSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  resource$: Observable<ResourceData> = this.resSubject.asObservable();

  setData(type: string, newValue: any) {
    switch (type) {
      case 'user': {
        this.userSubject.next(newValue);
        break;
      }
      case 'res': {
        this.resSubject.next(newValue);
        break;
      }
    }
  }
}
