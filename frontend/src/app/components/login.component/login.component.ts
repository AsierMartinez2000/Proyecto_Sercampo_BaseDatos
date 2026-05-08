import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  constructor(
    private loginService: LoginService,
    private cdr: ChangeDetectorRef
  ) {}

  datos_login = {
    nombre: 'Asier',
    password: '1234'
  }

  iniciarSesion(datos_login:any){
    if (this.datos_login.nombre != "" && this.datos_login.password != "") {
      this.loginService.comprobarLogin(datos_login).subscribe((resultado: any) => {
      if(resultado){
        this.loginService.setEstado(true);
        this.cdr.detectChanges();
      } else {
        console.log("Error de Login");
      }
    });
    } 
  }

}
