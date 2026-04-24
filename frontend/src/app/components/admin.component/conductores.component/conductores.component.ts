import { ChangeDetectorRef, Component } from '@angular/core';
import { RutasService } from '../../../services/rutas.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-conductores.component',
  imports: [FormsModule, CommonModule],
  templateUrl: './conductores.component.html',
  styleUrl: './conductores.component.css',
})


export class ConductoresComponent {

    constructor(
    // private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private rutasService: RutasService,
    private router: Router,
  ) {}


  dato_conductor = {
    nombre: '',
    telefono: '',
    email: ''
  };

  array_buscador_conductores: any[] = [];

   //Conductor seleccionado
  conductor_seleccionado = {
    id_conductor: '',
    nombre: '',
    telefono: '',
    email: ' ',
  };

  conductor_nuevo = {
     nombre: '',
    telefono: '',
    email: ' ',
  }

  editando: any = false;

 // --------------------------------- MÉTODOS CONDUCTORES  ---------------------------------
  buscarConductores() {
    if (this.dato_conductor.nombre.length > 1) {
      this.rutasService.traerDatosConductores(this.dato_conductor).subscribe((resultado: any) => {
        this.array_buscador_conductores = resultado; //Esto es el array
        this.cdr.detectChanges();
        console.log(resultado);
      });
    } else {
      this.array_buscador_conductores = [];
    }
  }

  seleccionarConductor(conductor: any) {
    //Este conductor es el seleccionado dentro del array_conductores de la lista.
    this.conductor_seleccionado.id_conductor = conductor.id_conductor;
    this.conductor_seleccionado.nombre = conductor.nombre;
    this.conductor_seleccionado.email = conductor.email;

    this.dato_conductor.nombre = '';
    this.buscarConductores();
  }

  nuevoConductor(conductor_nuevo: any){}

  modoEdicion(){
    if (this.editando == false) {
        this.editando = true;
    } else {
        this.editando = false;
    }
  }
}
