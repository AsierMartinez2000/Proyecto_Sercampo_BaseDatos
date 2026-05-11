import { Injectable, inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';

//Este "componente" de tipo Guard, es una función a la que se llama en routes y comprueba la información del usuario y devuelve true o false.
export function roleGuard(allowedRoles?: string[]): CanActivateFn {
  return (route, state) => {
    const loginService = inject(LoginService);
    const router = inject(Router);

    //Como el estado de login es una señal en servicio, es accesible desde aqui.
    const isLoggedIn = loginService.estadoLogin();
    
    if (!isLoggedIn) {
        //Si no esta logeado, devolver false, no hace falta redirigir, porque no tenemos /login como tal, solo un if en app.html
        loginService.cerrarSesion();
        return true;
    }

    // Si no se especifican roles, permitir acceso (solo requiere estar logueado) - CREO QUE QUIERO QUITAR ESTA LINEA
    if (!allowedRoles || allowedRoles.length === 0) {
        loginService.cerrarSesion();
        return true;
    }

    // Obtener el rol del usuario desde el servicio
    const userRole = loginService.obtenerRol();
    
    // Verificar si el rol del usuario está en la lista de roles permitidos, esto es la base del guard por roles.
    if (userRole && allowedRoles.includes(userRole)) {
      return true;
    }

    // Si el rol no está autorizado, o no existe, redirigmos al dashboard (Por defecto) y devolvemos false.
    router.navigate(['/ultimasRutas']);
    return false;
  };

  //CREO QUE CADA VEZ QUE DEVOLVEMOS FALSE, DEBERIAMOS HACER UN CERRAR SESION POR SEGURIDAD.
}