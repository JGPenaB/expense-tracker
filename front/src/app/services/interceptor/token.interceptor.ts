import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(){}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');
    if (token) {
      const newRequest = req.clone({setHeaders:{'Authorization':'Bearer '+token}});
      return next.handle(newRequest);
    } else {
      return next.handle(req);
    }

  }


}
