import { Injectable, signal, Inject, PLATFORM_ID } from '@angular/core'; 
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//PLATFORM_ID y isPlatFormBrowser funcionan como una API de cada navegador

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = 'http://localhost/proyecto_sercampo_basedatos/backend/index.php';

  private EstadoLogin = signal<boolean>(false);
  
  readonly estadoLogin = this.EstadoLogin.asReadonly();

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private httpClient: HttpClient) {
    // Inicializar el estado solo en el navegador
    if (isPlatformBrowser(this.platformId)) {
      this.EstadoLogin.set(this.obtenerEstadoInicial());
    }
  }

  private obtenerEstadoInicial(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('sesionActiva') === 'true';
    }
    return false;
  }

  setEstado(nuevoEstado: boolean) {
    this.EstadoLogin.set(nuevoEstado);
    // Solo guardar en localStorage si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('sesionActiva', String(nuevoEstado));
    }
  }

  cerrarSesion() {
    this.EstadoLogin.set(false);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('sesionActiva');
    }
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
}