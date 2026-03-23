import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


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

  async obtenerClienteNombre(datos:any) {
    this.httpClient
    .post(`${this.url}?controller=clientes&action=obtenerClienteNombre`, datos, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      withCredentials: true
    }).subscribe({
        next: (response: any) => {
          this.clientes = response; // Asignar la respuesta al array
          console.log('Clientes cargados:', (this.clientes = response));
        },
        error: (error) => {
          console.error('Error al cargar clientes:', error);
        },
      });
      console.log(datos);
      console.log(this.clientes);

      console.log("Soy return");
    return this.clientes;
  }
}
