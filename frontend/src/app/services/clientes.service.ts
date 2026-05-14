import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private url = 'base-datos-sercamponet.vercel.app';

  // clientes: any[] = [];

  constructor(private httpClient: HttpClient) { }

  obtenerClientes(): Observable<any> {
    return this.httpClient.get(
      `${this.url}?controller=clientes&action=obtenerClientes`,
      {
        headers: new HttpHeaders({
          Accept: 'application/json'
        }),
        withCredentials: true
      }
    );
  }

  obtenerClienteGeneral(dato: any): Observable<any> {
    console.log(dato);
    return this.httpClient.get(
      `${this.url}?controller=clientes&action=obtenerClienteGeneral`,
      {
        params: dato,
        headers: new HttpHeaders({
          Accept: 'application/json'
        }),
        withCredentials: true
      }
    );
  }

  obtenerClienteEspecifico(cliente: any): Observable<any> {
    console.log(cliente);
    return this.httpClient.get(
      `${this.url}?controller=clientes&action=obtenerClienteEspecifico`,
      {
        params: cliente,
        headers: new HttpHeaders({
          Accept: 'application/json'
        }),
        withCredentials: true
      }
    );
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

  actualizarCliente(cliente: any): Observable<any> {
    return this.httpClient.put(
      `${this.url}?controller=clientes&action=actualizarCliente`,
      cliente,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
        withCredentials: true
      }
    );
  }

  actualizarEstadoCliente(cliente: any): Observable<any> {
    return this.httpClient.patch(
      `${this.url}?controller=clientes&action=actualizarEstadoCliente`,
      cliente,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
        withCredentials: true
      }
    );
  }

}