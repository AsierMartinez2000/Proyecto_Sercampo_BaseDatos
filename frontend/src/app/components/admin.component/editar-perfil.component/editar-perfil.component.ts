import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-editar-perfil.component',
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css',
})
export class EditarPerfilComponent {

  usuario: any= null;

  usuario_antiguo = {
    id_usuario: "",
    nombre: "",
    email: "",
    telefono: "",
    rol: "",
  }

  editando: any = false;
    
  constructor(
    private loginService: LoginService,
    private cdr: ChangeDetectorRef,
    private adminService: AdminService
  ) {this.usuario = this.loginService.obtenerUsuario()}

  
  EntrarModoEdicion(){
    this.usuario_antiguo.id_usuario = this.usuario.id_usuario;
    this.usuario_antiguo.nombre = this.usuario.nombre;
    this.usuario_antiguo.email = this.usuario.email;
    this.usuario_antiguo.telefono = this.usuario.telefono;

    this.editando = true;
  }

  SalirModoEdicion(){
    this.usuario.id_conductor = this.usuario_antiguo.id_usuario;
    this.usuario.nombre = this.usuario_antiguo.nombre;
    this.usuario.email = this.usuario_antiguo.email;
    this.usuario.telefono = this.usuario_antiguo.telefono;
    this.editando = false;
  }

  enviarEdicion(){

    if(this.usuario.id_usuario != '' && this.usuario.nombre != '' && this.usuario.email != '' && this.usuario.telefono != ''){
      this.adminService.actualizarUsuarioPropio(this.usuario).subscribe((resultado: any) => {
        if (resultado == true){
          console.log(resultado);
          this.editando = false;
          this.cdr.detectChanges();
        }else {
          console.log(resultado);
          this.editando = false;
          this.cdr.detectChanges();
        }
      });
    }
  }


}
