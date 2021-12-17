import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var token;
    if(!!document.cookie.includes('token')) {
      token = (document!.cookie!.split(';')!.find(e => e.includes('token'))!.split('=')[1] as String);
    }
    const cloned = req.clone(!!token ? {
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    } : {});
    return next.handle(cloned);
  }
}
