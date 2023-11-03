import { Injectable } from '@angular/core';
import {HttpHandler, HttpRequest, HttpInterceptor} from '@angular/common/http';
import { enviroment } from 'src/app/Environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class BaseURLInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!req.url.match(/^http(s)?:\/\/(.*)$/)) {
      const url = `${enviroment.BASE_URL_KALUM_MANAGEMENT}${req.url}`.replace(/([^:]\/)\/+/g, '$1');
      req = req.clone({ url });
    }
    return next.handle(req);
  }
}