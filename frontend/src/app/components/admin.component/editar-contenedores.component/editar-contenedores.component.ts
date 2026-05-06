import { ChangeDetectorRef, Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-editar-contenedores.component',
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-contenedores.component.html',
  styleUrl: './editar-contenedores.component.css',
})
export class EditarContenedoresComponent {

  constructor(
   private adminService: AdminService,
   private cdr: ChangeDetectorRef
  ) {}

  dato_producto = {
    dato: "",
  };

  array_buscador_productos:any[] = [];

  producto_seleccionado = {
    id_producto: "",
    tipo: "",
    coste: "",
    notas: ""
  }

  buscarProducto(){

  }

  seleccionarProducto(producto:any){

  }

  enviarEdicion(){
    
  }

}
