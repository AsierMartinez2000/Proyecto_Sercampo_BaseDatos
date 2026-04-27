import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private url = 'http://localhost/proyecto_sercampo_basedatos/backend/index.php';

  constructor(private httpClient: HttpClient) {}

  traerProductos(): Observable<any> {
    return this.httpClient.post(
      `${this.url}?controller=admin&action=traerProductos`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        withCredentials: true,
      },
    );
  }

  actualizarConductor(datos_conductor: any): Observable<any> {
    return this.httpClient
    .post(`${this.url}?controller=admin&action=actualizarConductor`, datos_conductor, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      withCredentials: true
    })
  }


  insertarNuevoConductor(datos_conductor: any): Observable<any>{
    return this.httpClient
    .post(`${this.url}?controller=admin&action=nuevoConductor`, datos_conductor, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      withCredentials: true
    })
  }


}
