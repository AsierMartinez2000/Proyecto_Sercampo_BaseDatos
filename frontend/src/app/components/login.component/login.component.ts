import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  constructor(
    private loginService: LoginService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  datos_login = {
    nombre: 'Asier',
    password: '1234'
  }

 iniciarSesion(datos_login: any) {
  if (this.datos_login.nombre != "" && this.datos_login.password != "") {
    this.loginService.comprobarLogin(datos_login).subscribe((resultado: any) => {
      if (resultado === true) {
        this.loginService.setEstado(true);
        
        this.loginService.traerDatosUsuario(datos_login).subscribe((datosUsuario: any) => {  

          this.loginService.setUsuario(datosUsuario);

          const rol = datosUsuario.rol;

          console.log(rol);
          
            switch(rol) {
              case 'admin':
                this.router.navigate(['/admin']);
                break;
              case 'conductor':
                this.router.navigate(['/ultimasRutas']);
                break;
              case 'user':
                this.router.navigate(['/dashboard']);
                break;
            }

          this.cdr.detectChanges();


        });

      } else {
        console.log("Error de Login - Credenciales incorrectas");

        alert("Usuario o contraseña incorrectos");
      }
    });

  } else {

    console.log("Por favor complete todos los campos");

    alert("Por favor complete todos los campos");
  }
}

}
