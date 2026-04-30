import { ChangeDetectorRef, Component } from '@angular/core';
import { RutasService } from '../../../services/rutas.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin.service';

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
    private adminService: AdminService,
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
    email: ' ',
    telefono: '',
  }

  conductor_edicion_antiguo = {
    id_conductor: '',
    nombre: '',
    telefono: '',
    email: ' ',
  };

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
    this.conductor_seleccionado.telefono = conductor.telefono;

    this.dato_conductor.nombre = '';
    this.buscarConductores();
  }

  nuevoConductor(conductor_nuevo: any){

    this.adminService.insertarNuevoConductor(this.conductor_nuevo).subscribe({
        next: (respuesta: any) => {
          console.log('Conductor añadido:', respuesta);
        },
        error: (error) => {
          console.error('Error al añadir conductor:', error);
        },
        complete: () => {
          console.log('Conductor añadido');
          this.cdr.detectChanges();
          this.router.navigate(['confirmado']); 
        },
      });
     

  }




  EntrarModoEdicion(){
    this.conductor_edicion_antiguo.id_conductor = this.conductor_seleccionado.id_conductor;
    this.conductor_edicion_antiguo.nombre = this.conductor_seleccionado.nombre;
    this.conductor_edicion_antiguo.email = this.conductor_seleccionado.email;
    this.conductor_edicion_antiguo.telefono = this.conductor_seleccionado.telefono;
    //Esto lo hacemos para guardar en conductor_edicion_antiguo, los datos del conductor.
    //Ya que el valor que esta en conductor_seleccionado se cambia con NGModel
    this.editando = true;
  }

  SalirModoEdicion(){
    this.conductor_seleccionado.id_conductor = this.conductor_edicion_antiguo.id_conductor;
    this.conductor_seleccionado.nombre = this.conductor_edicion_antiguo.nombre;
    this.conductor_seleccionado.email = this.conductor_edicion_antiguo.email;
    this.conductor_seleccionado.telefono = this.conductor_edicion_antiguo.telefono;
    this.editando = false;
  }

  enviarEdicion(){

    if(this.conductor_seleccionado.id_conductor != '' && this.conductor_seleccionado.nombre != '' && this.conductor_seleccionado.email != '' && this.conductor_seleccionado.telefono != ''){
      this.adminService.actualizarConductor(this.conductor_seleccionado).subscribe((resultado: any) => {
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
