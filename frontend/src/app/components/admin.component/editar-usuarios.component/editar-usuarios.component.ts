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

  usuario_edicion_antiguo = {
    id_usuario: '',
    nombre: '',
    telefono: '',
    email: '',
    password: '',
    rol: '',
  };

  usuario_nuevo = {
    id_usuario: '',
    nombre: '',
    telefono: '',
    email: '',
    password: '',
    rol: '',
  };

  editando: any = false;

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


  
  EntrarModoEdicion(){
    this.usuario_edicion_antiguo.id_usuario = this.usuario_seleccionado.id_usuario;
    this.usuario_edicion_antiguo.nombre = this.usuario_seleccionado.nombre;
    this.usuario_edicion_antiguo.email = this.usuario_seleccionado.email;
    this.usuario_edicion_antiguo.telefono = this.usuario_seleccionado.telefono;
    this.usuario_edicion_antiguo.password = this.usuario_seleccionado.password;
    this.usuario_edicion_antiguo.rol = this.usuario_seleccionado.rol;


    this.editando = true;
  }

  SalirModoEdicion(){
    this.usuario_seleccionado.id_usuario = this.usuario_edicion_antiguo.id_usuario;
    this.usuario_seleccionado.nombre = this.usuario_edicion_antiguo.nombre;
    this.usuario_seleccionado.email = this.usuario_edicion_antiguo.email;
    this.usuario_seleccionado.telefono = this.usuario_edicion_antiguo.telefono;
    this.usuario_seleccionado.password = this.usuario_edicion_antiguo.password;
    this.usuario_seleccionado.rol = this.usuario_edicion_antiguo.rol;

    this.editando = false;
  }

  enviarEdicion(){

    if(this.usuario_seleccionado.id_usuario != '' && this.usuario_seleccionado.nombre != '' && this.usuario_seleccionado.password != '' && this.usuario_seleccionado.rol != ''){
      this.adminService.actualizarUsuario(this.usuario_seleccionado).subscribe((resultado: any) => {
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

  nuevoUsuario(usuario_nuevo: any){
    if(usuario_nuevo.nombre != '' && usuario_nuevo.password != '' && usuario_nuevo.rol != ''){
    this.adminService.insertarNuevoUsuario(this.usuario_nuevo).subscribe({
        next: (respuesta: any) => {
          console.log('usuario añadido:', respuesta);
        },
        error: (error) => {
          console.error('Error al añadir usuario:', error);
        },
        complete: () => {
          console.log('usuario añadido');
          this.cdr.detectChanges();
          this.router.navigate(['confirmado','']); 
        },
      });
    }
  }
}
