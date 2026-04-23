import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RutasService } from '../../services/rutas.service';

@Component({
  selector: 'app-rutas.component',
  imports: [FormsModule, CommonModule],
  templateUrl: './rutas.component.html',
  styleUrl: './rutas.component.css',
})
export class RutasComponent {
  constructor(
    // private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private rutasService: RutasService,
    private router: Router,
  ) {}

  //aqui almacenamos el dato que viene del input de rutas para buscar
  dato_buscado = {
    dato: '',
  };

  dato_conductor = {
    nombre: '',
  };

  dato_vehiculo = {
    dato: '',
  };

  //estos arrays son las lista que aparecen cuando buscamos
  array_buscador: any[] = [];

  array_buscador_conductores: any[] = [];

  array_buscador_vehiculos: any[] = [];

  //este array es para almacenar los datos que se muestran en la tabla
  rutas_guardadas: any[] = [];

  //Conductor seleccionado
  conductor_seleccionado = {
    id_conductor: '',
    nombre: '',
    email: ' ',
  };

  //Vehiculo seleccionado
  vehiculo_seleccionado = {
    matricula: '',
    modelo: '',
    num_poliza: '',
  };

  //fecha
  fecha: any = '';

  //notas
  notas: any = '';

  json_enviar = {
    rutas: this.rutas_guardadas,
    conductor: this.conductor_seleccionado,
    vehiculo: this.vehiculo_seleccionado,
    fecha: this.fecha,
    notas: this.notas,
  };

  // --------------------------------- MÉTODO GENERAL ---------------------------------
  buscarGeneral() {
    if (this.dato_buscado.dato.length >= 3) {
      this.rutasService.traerDatosBuscador(this.dato_buscado).subscribe((resultado: any) => {
        this.array_buscador = resultado; //Esto es el array
        this.cdr.detectChanges();
        console.log(resultado);
      });
    } else {
      this.array_buscador = [];
    }
  }

  vaciarBuscador() {
    this.dato_buscado.dato = '';
    this.array_buscador = [];
  }

  // --------------------------------- MÉTODOS VEHICULOS ---------------------------------
  buscarVehiculos() {
    if (this.dato_vehiculo.dato.length > 3) {
      this.rutasService.traerDatosVehiculos(this.dato_vehiculo).subscribe((resultado: any) => {
        this.array_buscador_vehiculos = resultado; //Esto es el array
        this.cdr.detectChanges();
        console.log(resultado);
      });
    } else {
      this.array_buscador_vehiculos = [];
    }
  }

  seleccionarVehiculo(vehiculo: any) {
    //Este vehiculo es el seleccionado dentro del array_conductores de la lista.
    this.vehiculo_seleccionado.matricula = vehiculo.matricula;
    this.vehiculo_seleccionado.modelo = vehiculo.modelo;
    this.vehiculo_seleccionado.num_poliza = vehiculo.num_poliza;

    this.dato_vehiculo.dato = '';
    this.buscarVehiculos();
  }

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

  //--------------------------------- MÉTODOS FORMULARIO ---------------------------------
  quitarCliente(id_cliente_buscado: any) {
    this.rutas_guardadas = this.rutas_guardadas.filter(
      (cliente) => cliente.id_contenedor !== id_cliente_buscado,
    );
    console.log(this.rutas_guardadas);
  }

  limpiarPagina() {
    this.dato_buscado.dato = '';
    this.array_buscador = [];
    this.rutas_guardadas = [];
  }

  meterEnRuta(cliente_encontrado: any) {
    this.rutas_guardadas.push(cliente_encontrado);
    this.cdr.detectChanges();
  }

  guardarRuta() {
    this.json_enviar.rutas = this.rutas_guardadas;
    this.json_enviar.conductor = this.conductor_seleccionado;
    this.json_enviar.vehiculo = this.vehiculo_seleccionado;
    this.json_enviar.fecha = this.fecha;
    this.json_enviar.notas = this.notas;

    if (
      (this.json_enviar.conductor.id_conductor != '') &&
      (this.json_enviar.vehiculo.matricula != '') &&
      (this.json_enviar.fecha != '') &&
      (this.json_enviar.rutas.length > 0)
    ) {
      this.rutasService.nuevaRuta(this.json_enviar).subscribe({
        next: (respuesta: any) => {
          console.log('Ruta añadida:', respuesta);
        },
        error: (error) => {
          console.error('Error al añadir recogida:', error);
          this.router.navigate(['error']);
        },
        complete: () => {
          console.log('Recogida añadida');
          this.router.navigate(['dashboard']);
        },
      });

      this.cdr.detectChanges();
    }
  }
}
