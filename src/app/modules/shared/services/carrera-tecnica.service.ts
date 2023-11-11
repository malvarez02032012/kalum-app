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

  addCarreraTecnica(body: any) {
    return this.http.post(`${BASE_URL}/carreras-tecnicas`, body);
  }

  updateCarreraTecnica(body: any) {
    return this.http.put(`${BASE_URL}/carreras-tecnicas/${body.carreraId}`, { Nombre: body.nombre });
  }

  deleteCarreraTecnica(carreraId: string) {
    return this.http.delete(`${BASE_URL}/carreras-tecnicas/${carreraId}`);
  }
}



