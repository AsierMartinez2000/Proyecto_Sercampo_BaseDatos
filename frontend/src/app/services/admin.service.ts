import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private url = 'base-datos-sercamponet.vercel.app';

  constructor(private httpClient: HttpClient) { }


  //-------------------------- METODOS PRODUCTOS --------------------------

  traerDatosProductos(datos_productos: any): Observable<any> {
    return this.httpClient.get(
      `${this.url}?controller=admin&action=traerProductos`,
      {
        params: datos_productos, // Los datos van como query params
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }),
        withCredentials: true,
      },
    );
  }

  actualizarProducto(dato_producto: any): Observable<any> {
    return this.httpClient.put(
      `${this.url}?controller=admin&action=actualizarProducto`,
      dato_producto,  // El body se mantiene igual que en POST
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
        withCredentials: true
      }
    );
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


  insertarNuevoConductor(datos_conductor: any): Observable<any> {
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
    return this.httpClient.get(
      `${this.url}?controller=admin&action=buscadorVehiculo`,
      {
        params: datosVehiculo, // Los datos van como query params
        headers: new HttpHeaders({
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
    return this.httpClient.put(
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
    return this.httpClient.get(
      `${this.url}?controller=admin&action=buscadorUsuario`,
      {
        params: datos_usuario,
        headers: new HttpHeaders({
          Accept: 'application/json',
        }),
        withCredentials: true,
      },
    );
  }

  actualizarUsuario(datos_usuario: any): Observable<any> {
    return this.httpClient.put(
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

  traerDatosContenedores(datos_contenedor: any): Observable<any> {
    return this.httpClient.get(
      `${this.url}?controller=admin&action=traerContenedores`,
      {
        params: datos_contenedor,
        headers: new HttpHeaders({
          Accept: 'application/json',
        }),
        withCredentials: true,
      },
    );
  }

  actualizarContenedor(dato_contenedor: any): Observable<any> {
    return this.httpClient.put(
      `${this.url}?controller=admin&action=actualizarContenedor`,
      dato_contenedor,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
        withCredentials: true
      }
    );
  }

  cargarMunicipios(provincia: any): Observable<any> {
    return this.httpClient.get(
      `${this.url}?controller=admin&action=traerMunicipios`,
      {
        params: provincia,
        headers: new HttpHeaders({
          Accept: 'application/json',
        }),
        withCredentials: true,
      },
    );
  }

  // -------------------------------- METODOS ZONAS ------------------------------


  insertarMunicipio(municipio_nuevo: any): Observable<any> {
    return this.httpClient
      .post(`${this.url}?controller=admin&action=nuevoMunicipio`, municipio_nuevo, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
        withCredentials: true
      })
  }


  // 

  actualizarUsuarioPropio(usuario: any): Observable<any> {
    return this.httpClient.put(
      `${this.url}?controller=admin&action=actualizarUsuarioPropio`,
      usuario,
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
