import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private url = 'http://localhost/proyecto_sercampo_basedatos/backend/index.php';

  clientes: any[] = [];

  constructor(private httpClient: HttpClient) {}

  obtenerClientes() {
    this.httpClient
      .get(`${this.url}?controller=clientes&action=obtenerClientes`, {
        withCredentials: true,
      })
      .subscribe({
        next: (response: any) => {
          this.clientes = response; // Asignar la respuesta al array
          console.log('Clientes cargados:', (this.clientes = response));
        },
        error: (error) => {
          console.error('Error al cargar clientes:', error);
        },
      });

    return this.clientes;
  }

  obtenerClientesOrdenados() {
    this.httpClient
      .get(`${this.url}?controller=clientes&action=obtenerClientesOrdenados`, {
        withCredentials: true,
      })
      .subscribe({
        next: (response: any) => {
          this.clientes = response; // Asignar la respuesta al array
          console.log('Clientes cargados:', (this.clientes = response));
        },
        error: (error) => {
          console.error('Error al cargar clientes:', error);
        },
      });

    return this.clientes;
  }


  obtenerClienteNombre(nombre:any): Observable<any> {
    return this.httpClient
    .post(`${this.url}?controller=clientes&action=obtenerClienteNombre`, nombre, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      withCredentials: true
    })
  }

  obtenerClienteGeneral(dato: any): Observable<any> {
    return this.httpClient
    .post(`${this.url}?controller=clientes&action=obtenerClienteGeneral`,dato, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      withCredentials: true
    })
  }
}