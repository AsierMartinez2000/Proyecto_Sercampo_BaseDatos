import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-vehiculos.component',
  imports: [FormsModule, CommonModule],
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.css',
})
export class VehiculosComponent {

  constructor(
    // private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private adminService: AdminService,
    private router: Router,
  ) {}

  dato_vehiculo = {
    dato: '',
  };

  array_buscador_vehiculos: any[] = [];

   //vehiculo seleccionado
  vehiculo_seleccionado = {
    matricula: '',
    modelo: '',
    fecha_itv: '',
    fecha_mantenimiento: '',
    precio_mantenimiento: '',
    taller_mantenimiento: '',
    num_bastidor: '',
    num_poliza: '',
    tel_emergencias: '',
    tel_contacto: '',
    empresa: ''
  };

  vehiculo_nuevo = {
    matricula: '',
    modelo: '',
    fecha_itv: '',
    fecha_mantenimiento: '',
    precio_mantenimiento: '',
    taller_mantenimiento: '',
    num_bastidor: '',
    num_poliza: '',
    tel_emergencias: '',
    tel_contacto: '',
    empresa: ''
  }

  vehiculo_edicion_antiguo = {
    matricula: '',
    modelo: '',
    fecha_itv: '',
    fecha_mantenimiento: '',
    precio_mantenimiento: '',
    taller_mantenimiento: '',
    num_bastidor: '',
    num_poliza: '',
    tel_emergencias: '',
    tel_contacto: '',
    empresa: ''
  };

  editando: any = false;

 // --------------------------------- MÉTODOS vehiculoES  ---------------------------------
  buscarVehiculos() {
    if (this.dato_vehiculo.dato.length > 1) {
      this.adminService.traerDatosVehiculos(this.dato_vehiculo).subscribe((resultado: any) => {
        this.array_buscador_vehiculos = resultado; //Esto es el array
        this.cdr.detectChanges();
        console.log(resultado);
      });
    } else {
      this.array_buscador_vehiculos = [];
    }
  }

  seleccionarVehiculo(vehiculo: any) {
    //Este vehiculo es el seleccionado dentro del array_vehiculoes de la lista.
    this.vehiculo_seleccionado.matricula = vehiculo.matricula;
    this.vehiculo_seleccionado.modelo = vehiculo.modelo;
    this.vehiculo_seleccionado.fecha_itv = vehiculo.fecha_itv;
    this.vehiculo_seleccionado.fecha_mantenimiento = vehiculo.fecha_mantenimiento;
    this.vehiculo_seleccionado.precio_mantenimiento = vehiculo.precio_mantenimiento;
    this.vehiculo_seleccionado.taller_mantenimiento = vehiculo.taller_mantenimiento;
    this.vehiculo_seleccionado.num_bastidor = vehiculo.num_bastidor;
    this.vehiculo_seleccionado.num_poliza = vehiculo.num_poliza;
    this.vehiculo_seleccionado.tel_emergencias = vehiculo.tel_emergencias;
    this.vehiculo_seleccionado.tel_contacto = vehiculo.tel_contacto;
    this.vehiculo_seleccionado.empresa = vehiculo.empresa;
    this.cdr.detectChanges();

    this.dato_vehiculo.dato = '';
    this.buscarVehiculos();
  }

  nuevoVehiculo(vehiculo_nuevo: any){
    this.adminService.insertarNuevoVehiculo(this.vehiculo_nuevo).subscribe({
        next: (respuesta: any) => {
          console.log('vehiculo añadido:', respuesta);
        },
        error: (error) => {
          console.error('Error al añadir vehiculo:', error);
        },
        complete: () => {
          console.log('vehiculo añadido');
          this.cdr.detectChanges();
          this.router.navigate(['confirmado', ""]); 
        },
      });
     

  }




  EntrarModoEdicion(){
    this.vehiculo_edicion_antiguo.matricula  = this.vehiculo_seleccionado.matricula;
    this.vehiculo_edicion_antiguo.modelo  = this.vehiculo_seleccionado.modelo   
    this.vehiculo_edicion_antiguo.fecha_itv  = this.vehiculo_seleccionado.fecha_itv;
    this.vehiculo_edicion_antiguo.fecha_mantenimiento  = this.vehiculo_seleccionado.fecha_mantenimiento;
    this.vehiculo_edicion_antiguo.precio_mantenimiento  = this.vehiculo_seleccionado.precio_mantenimiento;
    this.vehiculo_edicion_antiguo.taller_mantenimiento  = this.vehiculo_seleccionado.taller_mantenimiento;
    this.vehiculo_edicion_antiguo.num_bastidor  = this.vehiculo_seleccionado.num_bastidor;
    this.vehiculo_edicion_antiguo.num_poliza  = this.vehiculo_seleccionado.num_poliza;
    this.vehiculo_edicion_antiguo.tel_emergencias  = this.vehiculo_seleccionado.tel_emergencias;
    this.vehiculo_edicion_antiguo.tel_contacto  = this.vehiculo_seleccionado.tel_contacto;
    this.vehiculo_edicion_antiguo.empresa  = this.vehiculo_seleccionado.empresa;  

    this.editando = true;
  }

  SalirModoEdicion(){

    this.vehiculo_seleccionado.matricula  = this.vehiculo_edicion_antiguo.matricula;
    this.vehiculo_seleccionado.modelo  = this.vehiculo_edicion_antiguo.modelo   
    this.vehiculo_seleccionado.fecha_itv  = this.vehiculo_edicion_antiguo.fecha_itv;
    this.vehiculo_seleccionado.fecha_mantenimiento  = this.vehiculo_edicion_antiguo.fecha_mantenimiento;
    this.vehiculo_seleccionado.precio_mantenimiento  = this.vehiculo_edicion_antiguo.precio_mantenimiento;
    this.vehiculo_seleccionado.taller_mantenimiento  = this.vehiculo_edicion_antiguo.taller_mantenimiento;
    this.vehiculo_seleccionado.num_bastidor  = this.vehiculo_edicion_antiguo.num_bastidor;
    this.vehiculo_seleccionado.num_poliza  = this.vehiculo_edicion_antiguo.num_poliza;
    this.vehiculo_seleccionado.tel_emergencias  = this.vehiculo_edicion_antiguo.tel_emergencias;
    this.vehiculo_seleccionado.tel_contacto  = this.vehiculo_edicion_antiguo.tel_contacto;
    this.vehiculo_seleccionado.empresa  = this.vehiculo_edicion_antiguo.empresa;  

    this.editando = false;
  }

  enviarEdicion(){
    if(this.vehiculo_seleccionado.matricula != '' && this.vehiculo_seleccionado.modelo != '' && this.vehiculo_seleccionado.num_bastidor != '' && this.vehiculo_seleccionado.num_poliza != ''){
      this.adminService.actualizarVehiculo(this.vehiculo_seleccionado).subscribe((resultado: any) => {
        if (resultado == true){
          console.log(resultado);

              // this.vehiculo_seleccionado.matricula = resultado.matricula;
              // this.vehiculo_seleccionado.modelo = resultado.modelo;
              // this.vehiculo_seleccionado.fecha_itv = resultado.fecha_itv;
              // this.vehiculo_seleccionado.fecha_mantenimiento = resultado.fecha_mantenimiento;
              // this.vehiculo_seleccionado.precio_mantenimiento = resultado.precio_mantenimiento;
              // this.vehiculo_seleccionado.taller_mantenimiento = resultado.taller_mantenimiento;
              // this.vehiculo_seleccionado.num_bastidor = resultado.num_bastidor;
              // this.vehiculo_seleccionado.num_poliza = resultado.num_poliza;
              // this.vehiculo_seleccionado.tel_emergencias = resultado.tel_emergencias;
              // this.vehiculo_seleccionado.tel_contacto = resultado.tel_contacto;
              // this.vehiculo_seleccionado.empresa = resultado.empresa;
              // this.cdr.detectChanges();


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
