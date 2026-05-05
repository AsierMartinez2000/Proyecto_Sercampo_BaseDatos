import { ChangeDetectorRef, Component } from '@angular/core';
import { RutasService } from '../../../services/rutas.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-editar-usuarios.component',
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-usuarios.component.html',
  styleUrl: './editar-usuarios.component.css',
})
export class EditarUsuariosComponent {

    constructor(
    // private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private adminService: AdminService,
    private router: Router,
  ) {}


  
  dato_usuario = {
    dato: "",
  };

  array_buscador_usuarios: any[] = [];

   //usuario seleccionado
  usuario_seleccionado = {
    id_usuario: '',
    nombre: '',
    telefono: '',
    email: '',
    password: '',
    rol: '',
  };

  buscarUsuarios(){
    if (this.dato_usuario.dato.length > 1) {
      this.adminService.traerDatosUsuarios(this.dato_usuario).subscribe((resultado: any) => {
        this.array_buscador_usuarios = resultado; //Esto es el array
        this.cdr.detectChanges();
        console.log(resultado);
      });
    } else {
      this.array_buscador_usuarios = [];
    }
  }

  seleccionarUsuario(usuario: any){

    this.usuario_seleccionado.id_usuario = usuario.id_usuario;
    this.usuario_seleccionado.nombre = usuario.nombre;
    this.usuario_seleccionado.telefono = usuario.telefono;
    this.usuario_seleccionado.email = usuario.email;
    this.usuario_seleccionado.password = usuario.password;
    this.usuario_seleccionado.rol = usuario.rol;

    this.dato_usuario.dato = '';
    this.buscarUsuarios();
  }
}
