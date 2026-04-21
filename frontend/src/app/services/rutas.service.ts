import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RutasService {
  private url = 'http://localhost/proyecto_sercampo_basedatos/backend/index.php';

  constructor(private httpClient: HttpClient) {}

  traerDatosBuscador(datoBuscador: any): Observable<any> {
    return this.httpClient.post(
      `${this.url}?controller=rutas&action=buscadorParaRutas`,
      datoBuscador,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        withCredentials: true,
      },
    );
  }

  traerDatosConductores(datoConductor: any): Observable<any> {
    return this.httpClient.post(
      `${this.url}?controller=rutas&action=buscadorConductor`,
      datoConductor,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        withCredentials: true,
      },
    );
  }

  traerDatosVehiculos(datoVehiculo: any): Observable<any> {
    return this.httpClient.post(
      `${this.url}?controller=rutas&action=buscadorVehiculo`,
      datoVehiculo,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        withCredentials: true,
      },
    );
  }
}
