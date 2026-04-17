import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecogidasService {
  private url = 'http://localhost/proyecto_sercampo_basedatos/backend/index.php';

  constructor(private httpClient: HttpClient) {}

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
    return this.httpClient
    .post(`${this.url}?controller=recogidas&action=traerHorecasPorNombre`,datoBuscador, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      withCredentials: true
    })
  }

  traerContenedorPorDato(datoBuscador: any): Observable<any>{
    return this.httpClient
    .post(`${this.url}?controller=recogidas&action=traerContenedorPorDato`,datoBuscador, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      withCredentials: true
    })
  }

  nuevaRecogidaContenedor(contenedor: any): Observable<any>{
    return this.httpClient
      .post(`${this.url}?controller=recogidas&action=nuevaRecogidaContenedor`, contenedor, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
       withCredentials: true
    })
  }

}
