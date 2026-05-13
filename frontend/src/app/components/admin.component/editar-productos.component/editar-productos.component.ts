import { ChangeDetectorRef, Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-editar-productos.component',
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-productos.component.html',
  styleUrl: './editar-productos.component.css',
})
export class EditarProductosComponent implements OnInit {

  productos: any[] = [];

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


  constructor(
   private adminService: AdminService,
   private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

   this.buscarProducto();

  }

  buscarProducto(){
      this.adminService.traerDatosProductos(this.dato_producto).subscribe((resultado: any) => {
        this.array_buscador_productos = resultado; //Esto es el array
        this.cdr.detectChanges();
        console.log(resultado);
      });
    
  }

  seleccionarProducto(producto:any){

    this.producto_seleccionado.id_producto = producto.id_producto;
    this.producto_seleccionado.tipo = producto.tipo;
    this.producto_seleccionado.coste = producto.coste;
    this.producto_seleccionado.notas = producto.notas;

    this.dato_producto.dato = '';
    this.buscarProducto();

  }

  enviarEdicion(){

    if(this.producto_seleccionado.id_producto != '' && this.producto_seleccionado.tipo != ''){
      console.log("hola");
      this.adminService.actualizarProducto(this.producto_seleccionado).subscribe((resultado: any) => {

        if (resultado == true){
          console.log(resultado);
          this.producto_seleccionado.id_producto = "";
          this.producto_seleccionado.tipo = "Producto Editado";
          this.producto_seleccionado.coste = "";
          this.producto_seleccionado.notas = "";

          this.cdr.detectChanges();

        }else {
          console.log(resultado);
          // this.editando = false;
          this.cdr.detectChanges();
        }
      });
    }
  }



}
