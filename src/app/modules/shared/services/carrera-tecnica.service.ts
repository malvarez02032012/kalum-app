import { Injectable } from '@angular/core';
import { CarreraTecnica } from '../../carreras-tecnicas/model/carrera-tecnica.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { enviroment } from 'src/app/Environments/enviroment';
import { Observable, catchError, of } from 'rxjs';
import { throwError } from 'rxjs';

const BASE_URL = `${enviroment.BASE_URL_KALUM_MANAGEMENT}/v1`;

@Injectable({
  providedIn: 'root'
})

export class CarreraTecnicaService {
  constructor(private http: HttpClient) { }

  getCarreras() {
    return this.http.get(`${BASE_URL}/carreras-tecnicas`);
  }

  // addCarreraTecnica(body:any)
  // {
  //   // return this.http.post(`${BASE_URL}/carreras-tecnicas`, body);
  // }

  addCarreraTecnica(body:any):Observable<HttpResponse<any>>
  {
    return this.http.post<any>(`${BASE_URL}/carreras-tecnicas`, body, { observe: 'response' })
    .pipe(catchError(this.handleError<any>('countries')));
  }

  private handleError<T>(operation = 'operation') {
    return (error: any): Observable<T> => {
      console.log(`Error: ${error.message}`);
      return of(error);
    };
  }
}



