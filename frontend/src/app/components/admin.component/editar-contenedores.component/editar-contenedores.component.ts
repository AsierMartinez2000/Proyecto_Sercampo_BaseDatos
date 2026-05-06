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
export class EditarContenedoresComponent implements OnInit{

  constructor(
   private adminService: AdminService,
   private cdr: ChangeDetectorRef
  ) {}

  dato_contenedor = {
    dato: "",
  };

  array_buscador_contenedores:any[] = [];

  contenedor_seleccionado = {
    id_tipo_contenedor: "",
    tipo: "",
    capacidad: "",
    notas: ""
  }

  ngOnInit(): void {

   this.buscarContenedor();

  }


  buscarContenedor(){
    this.adminService.traerDatosContenedores(this.dato_contenedor).subscribe((resultado: any) => {
        this.array_buscador_contenedores = resultado; //Esto es el array
        this.cdr.detectChanges();
        console.log(resultado);
      });
  }

  seleccionarContenedor(contenedor: any){

    this.contenedor_seleccionado.id_tipo_contenedor = contenedor.id_tipo_contenedor;
    this.contenedor_seleccionado.tipo = contenedor.tipo;
    this.contenedor_seleccionado.capacidad = contenedor.capacidad;
    this.contenedor_seleccionado.notas = contenedor.notas;

    this.dato_contenedor.dato = '';
    this.buscarContenedor();

  }

  enviarEdicion(){

    if(this.contenedor_seleccionado.id_tipo_contenedor != '' && this.contenedor_seleccionado.tipo != ''){
      this.adminService.actualizarContenedor(this.contenedor_seleccionado).subscribe((resultado: any) => {

        if (resultado == true){
          console.log(resultado);
          this.contenedor_seleccionado.id_tipo_contenedor = "";
          this.contenedor_seleccionado.tipo = "Contenedor Editado";
          this.contenedor_seleccionado.capacidad = "";
          this.contenedor_seleccionado.notas = "";

          this.cdr.detectChanges();

        }else {
          console.log(resultado);
          this.cdr.detectChanges();
        }
      });
    }
  }

}
