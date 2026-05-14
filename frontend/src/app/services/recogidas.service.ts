import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecogidasService {
  private url = 'base-datos-sercamponet.vercel.app';

  constructor(private httpClient: HttpClient) { }

  nuevaRecogidaHoreca(recogida: any): Observable<any> {
    return this.httpClient
      .post(`${this.url}?controller=recogidas&action=nuevaRecogidaHoreca`, recogida, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
        withCredentials: true
      })
  }

  traerHorecasPorNombre(datoBuscador: any): Observable<any> {
    return this.httpClient.get(
      `${this.url}?controller=recogidas&action=traerHorecasPorNombre`,
      {
        params: datoBuscador,
        headers: new HttpHeaders({
          Accept: 'application/json'
        }),
        withCredentials: true
      }
    );
  }

  traerContenedorPorDato(datoBuscador: any): Observable<any> {
    return this.httpClient.get(
      `${this.url}?controller=recogidas&action=traerContenedorPorDato`,
      {
        params: datoBuscador,
        headers: new HttpHeaders({
          Accept: 'application/json'
        }),
        withCredentials: true
      }
    );
  }

  nuevaRecogidaContenedor(contenedor: any): Observable<any> {
    return this.httpClient
      .post(`${this.url}?controller=recogidas&action=nuevaRecogidaContenedor`, contenedor, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
        withCredentials: true
      })
  }

  traerEESSPorDato(datoBuscador: any): Observable<any> {
    return this.httpClient.get(
      `${this.url}?controller=recogidas&action=traerEESSPorDato`,
      {
        params: datoBuscador,
        headers: new HttpHeaders({
          Accept: 'application/json'
        }),
        withCredentials: true
      }
    );
  }

  nuevaRecogidaEESS(eess: any): Observable<any> {
    return this.httpClient
      .post(`${this.url}?controller=recogidas&action=nuevaRecogidaEESS`, eess, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
        withCredentials: true
      })
  }

  traerIdRuta(datos_recogida: any): Observable<any> {
    return this.httpClient.get(
      `${this.url}?controller=recogidas&action=traerIdRuta`,
      {
        params: datos_recogida,
        headers: new HttpHeaders({
          Accept: 'application/json'
        }),
        withCredentials: true
      }
    );
  }

  obtenerRecogidas(filtros: any): Observable<any> {
    return this.httpClient
      .post(`${this.url}?controller=recogidas&action=traerRecogidasFiltradas`, filtros, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
        withCredentials: true
      })
  }

  cargarConductores(): Observable<any> {
    return this.httpClient.get(
      `${this.url}?controller=recogidas&action=cargarConductores`,
      {
        headers: new HttpHeaders({
          Accept: 'application/json'
        }),
        withCredentials: true
      }
    );
  }

  cargarProvincias(): Observable<any> {
    return this.httpClient.get(
      `${this.url}?controller=recogidas&action=cargarProvincias`,
      {
        headers: new HttpHeaders({
          Accept: 'application/json'
        }),
        withCredentials: true
      }
    );
  }
}
