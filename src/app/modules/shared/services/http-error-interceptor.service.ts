import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { CarreraTecnicaService } from './carrera-tecnica.service';

@Injectable({
  providedIn: 'root'
})

export class HttpErrorInterceptorService implements HttpInterceptor {

  constructor(private errorService: CarreraTecnicaService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((httpErrorResponse: HttpErrorResponse) => {
          let errorMesagge = '';
          let errorType = '';
 
          if (httpErrorResponse.error instanceof ErrorEvent) {
            errorType = "Client side error"
            errorMesagge = httpErrorResponse.error.error;
          } else {
            errorType = "Server side error"
            if (httpErrorResponse.status === 0) {
              errorMesagge = "No hay conexión con el servidor";
            } else {
              errorMesagge = `${httpErrorResponse.status}: ${httpErrorResponse.error.error}`;
            }
            // this.toastrService.error(errorMesagge, errorType, { closeButton: true });
          }
          console.log("Interceptor", errorType);
          
          return throwError(()=> new Error(errorMesagge));
        })
      )
  }
}
