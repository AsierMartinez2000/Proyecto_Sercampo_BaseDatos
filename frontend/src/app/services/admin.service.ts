import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private url = 'http://localhost/proyecto_sercampo_basedatos/backend/index.php';

  constructor(private httpClient: HttpClient) {}


  //-------------------------- METODOS PRODUCTOS --------------------------

  traerDatosProductos(datos_productos:any): Observable<any> {
    return this.httpClient.post(
      `${this.url}?controller=admin&action=traerProductos`, datos_productos,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }),
        withCredentials: true,
      },
    );
  }

    actualizarProducto(dato_producto: any): Observable<any> {
    return this.httpClient
    .post(`${this.url}?controller=admin&action=actualizarProducto`, dato_producto, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      withCredentials: true
    })
  }


  // -------------------------- METODOS CONDUCTOR --------------------------

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


  // ------------------------------ METODOS VEHICULOS ------------------------------

  traerDatosVehiculos(datosVehiculo: any): Observable<any> {
    return this.httpClient.post(
      `${this.url}?controller=admin&action=buscadorVehiculo`,
      datosVehiculo,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        withCredentials: true,
      },
    );
  }

  insertarNuevoVehiculo(datosVehiculo: any): Observable<any> {
    return this.httpClient.post(
      `${this.url}?controller=admin&action=nuevoVehiculo`,
      datosVehiculo,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        withCredentials: true,
      },
    );
  }

  actualizarVehiculo(datosVehiculo: any): Observable<any> {
    return this.httpClient.post(
      `${this.url}?controller=admin&action=actualizarVehiculo`,
      datosVehiculo,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        withCredentials: true,
      },
    );
  }

  // ------------------------------ METODOS USUARIOS ------------------------------

  traerDatosUsuarios(datos_usuario: any): Observable<any> {
    return this.httpClient.post(
      `${this.url}?controller=admin&action=buscadorUsuario`,
      datos_usuario,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        withCredentials: true,
      },
    );
  }

  actualizarUsuario(datos_usuario: any): Observable<any> {
    return this.httpClient.post(
      `${this.url}?controller=admin&action=actualizarUsuario`,
      datos_usuario,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        withCredentials: true,
      },
    );
  }

  insertarNuevoUsuario(datos_usuario: any): Observable<any> {
    return this.httpClient.post(
      `${this.url}?controller=admin&action=nuevoUsuario`,
      datos_usuario,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        withCredentials: true,
      },
    );
  }


  
  //-------------------------- METODOS CONTENEDORES --------------------------

  traerDatosContenedores(datos_contenedor:any): Observable<any> {
    return this.httpClient.post(
      `${this.url}?controller=admin&action=traerContenedores`, datos_contenedor,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }),
        withCredentials: true,
      },
    );
  }

    actualizarContenedor(dato_contenedor: any): Observable<any> {
    return this.httpClient
    .post(`${this.url}?controller=admin&action=actualizarContenedor`, dato_contenedor, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      withCredentials: true
    })
  }




}
