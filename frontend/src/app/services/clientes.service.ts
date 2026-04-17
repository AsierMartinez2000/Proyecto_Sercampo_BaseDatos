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

  obtenerClienteGeneral(dato: any): Observable<any> {
    console.log(dato);
    return this.httpClient
    .post(`${this.url}?controller=clientes&action=obtenerClienteGeneral`,dato, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      withCredentials: true
    })
  }

  obtenerClienteEspecifico(cliente: any): Observable<any> {
    console.log(cliente);
    return this.httpClient
    .post(`${this.url}?controller=clientes&action=obtenerClienteEspecifico`, cliente, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      withCredentials: true
    })
  }

  anadirCliente(cliente: any): Observable<any> {
    return this.httpClient
    .post(`${this.url}?controller=clientes&action=nuevoCliente`, cliente, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      withCredentials: true
    })
  }

  actualizarCliente(cliente: any): Observable<any>{
     return this.httpClient
    .post(`${this.url}?controller=clientes&action=actualizarCliente`, cliente, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      withCredentials: true
    })

  }

  actualizarEstadoCliente(cliente: any): Observable<any>{
     return this.httpClient
    .post(`${this.url}?controller=clientes&action=actualizarEstadoCliente`, cliente, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      withCredentials: true
    })
  }

  traerDatosBuscador(datoBuscador: any): Observable<any>{
    return this.httpClient
      .post(`${this.url}?controller=rutas&action=buscadorParaRutas`, datoBuscador, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
       withCredentials: true
    })
  }

}