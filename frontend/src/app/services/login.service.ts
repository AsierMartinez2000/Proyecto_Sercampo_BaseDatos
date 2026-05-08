import { Injectable, signal, Inject, PLATFORM_ID } from '@angular/core'; 
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//PLATFORM_ID y isPlatFormBrowser funcionan como una API de cada navegador, hay que hacerle una peticion en el constructor para traer lo que tenga guardado en localstorage.
//PLATFORM_ID es el token del navegador, al que hacer la peticion, y isPlatFormBrowser comprueba que estamos en un navegador.

export interface Usuario {
  id_usuario: number;
  nombre: string;
  email: string;
  telefono: string;
  rol: string;
}
//Definimos la estructura que va a tener usuario en localstorage

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = 'http://localhost/proyecto_sercampo_basedatos/backend/index.php';

  private EstadoLogin = signal<boolean>(false); //Definimos una variable de tipo señal.
  readonly estadoLogin = this.EstadoLogin.asReadonly(); //Y otra que se comunica con la señal. 
  // Esto es necesario porque si no al hacer this.EstadoLogin, siempre es true por ser una señal, porque lee en una señal si esta definida, y como si, dice true, hay que mandar el contenido.

  //Igual para usuario
  private UsuarioActual = signal<Usuario | null>(null); //Puede ser de tipo Usuario (la estructura definida arriba) o de tipo null, y por defecto esta en null
  readonly usuarioActual = this.UsuarioActual.asReadonly();


  //Sacamos con el TOKEN del navegador, donde hacer las peticiones a localstorage, y lo llamamos platformId.
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private httpClient: HttpClient) {
    // Inicializar el estado solo en el navegado
    if (isPlatformBrowser(this.platformId)) { //Comprobamos si es el navegador que corresponde al Token. (Seguridad)
      this.EstadoLogin.set(this.obtenerEstadoInicial()); //Seteamos EstadoLogin al valor que devuelva el metodo.

      const usuarioGuardado = localStorage.getItem('usuario'); //Obtiene el objeto/item "usuario" de localStorage y lo guarda.
  
      if(usuarioGuardado){ //Si es true, es porque lo encontró, por lo que había un usuario guardado ya.
          this.UsuarioActual.set(JSON.parse(usuarioGuardado)); //Entonces seteamos el atributo UsuarioActual con lo encuentre en LocalStorage.
      }
    }

  }

  private obtenerEstadoInicial(): boolean {
    
    if (isPlatformBrowser(this.platformId)) { //Volvemos a comprobar que es el navegador que es.
      return localStorage.getItem('sesionActiva') === 'true'; //Si haciendo Buscamos el objeto/item "sesionActiva" en localStorage, y solo si es true lo devolvemos para que EstadoLogin coja ese valor.
    }
    return false; //Si no encuentra el objeto "sesionActiva" en localStorage es porque no se ha creado anteriormente, por lo que es false.
  }

  setEstado(nuevoEstado: boolean) {
    this.EstadoLogin.set(nuevoEstado); //Cambiamos primero el estado de nuestro atributo
    // Solo guardar en localStorage si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('sesionActiva', String(nuevoEstado)); //Guardamos el valor que hemos guardado en el atributo tambien en el localstorage
    }
  }

  cerrarSesion() {
    //Pone a false y a null los atributos.
    this.EstadoLogin.set(false);
    this.UsuarioActual.set(null);
    //Elimina los items/objetos almacenados en localStorage.
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('sesionActiva');
      localStorage.removeItem('usuario');
    }
  }


  setUsuario(usuario: Usuario) {

    this.UsuarioActual.set(usuario);

    console.log(usuario);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
    }
  }

  obtenerUsuario(): Usuario | null {
    return this.UsuarioActual();
  }

  obtenerRol(): string | null {
    return this.UsuarioActual()?.rol || null;
  }


  comprobarLogin(datos_login: any): Observable<any> {
    return this.httpClient.post(
      `${this.url}?controller=login&action=procesarLogin`, datos_login,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }),
        withCredentials: true,
      },
    );
  }

  traerDatosUsuario(datos_login: any): Observable<any> {
    return this.httpClient.post(
      `${this.url}?controller=login&action=traerDatos`, datos_login,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }),
        withCredentials: true,
      },
    );
  }
}