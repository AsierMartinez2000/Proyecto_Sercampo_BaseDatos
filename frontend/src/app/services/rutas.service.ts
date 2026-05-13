import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RutasService {
  private url = 'http://localhost/proyecto_sercampo_basedatos/backend/index.php';

  constructor(private httpClient: HttpClient) { }

  traerDatosBuscador(datoBuscador: any): Observable<any> {
    return this.httpClient.get(
      `${this.url}?controller=rutas&action=buscadorParaRutas`,
      {
        params: datoBuscador,
        headers: new HttpHeaders({
          Accept: 'application/json',
        }),
        withCredentials: true,
      },
    );
  }

  traerDatosConductores(datoConductor: any): Observable<any> {
    return this.httpClient.get(
      `${this.url}?controller=rutas&action=buscadorConductor`,
      {
        params: datoConductor,
        headers: new HttpHeaders({
          Accept: 'application/json',
        }),
        withCredentials: true,
      },
    );
  }

  traerDatosVehiculos(datoVehiculo: any): Observable<any> {
    return this.httpClient.get(
      `${this.url}?controller=rutas&action=buscadorVehiculo`,
      {
        params: datoVehiculo,
        headers: new HttpHeaders({
          Accept: 'application/json',
        }),
        withCredentials: true,
      },
    );
  }

  nuevaRuta(datoRuta: any): Observable<any> {
    return this.httpClient.post(
      `${this.url}?controller=rutas&action=insertarRuta`,
      datoRuta,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        withCredentials: true,
      },
    );
  }

  obtenerRutas(filtros: any): Observable<any> {
    return this.httpClient
      .post(`${this.url}?controller=rutas&action=traerRutasFiltradas`, filtros, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
        withCredentials: true
      })
  }

  cargarVehiculos(): Observable<any> {
    return this.httpClient.get(
      `${this.url}?controller=rutas&action=cargarVehiculos`,
      {
        headers: new HttpHeaders({
          Accept: 'application/json'
        }),
        withCredentials: true
      }
    );
  }
}
