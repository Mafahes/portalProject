import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  setters: string[] = ['user']

  constructor() {

  }

  private userSubject: BehaviorSubject<any> = new BehaviorSubject(123);
  user$: Observable<string> = this.userSubject.asObservable();

  setData(type: string, newValue: string) {
    switch (type) {
      case 'user': {
        this.userSubject.next(newValue);
        break;
      }
    }
  }
}
