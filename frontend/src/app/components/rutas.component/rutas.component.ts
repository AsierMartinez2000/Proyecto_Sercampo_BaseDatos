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
  ) { }


  
  //aqui almacenamos el dato que viene del input de rutas para buscar
  dato_buscado = {
    dato: ''
  }

  dato_conductor = {
    nombre: ''
  }

  dato_vehiculo = {
    dato: ''
  }

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
    email: ' '
  }
  
  //Vehiculo seleccionado
  vehiculo_seleccionado = {
    matricula: '',
    modelo: '',
    num_poliza: '',
    telefono_emergencias: '', //telefono de asistencia en carretera
    telefeno_aseguradora: '', //telefono comercial de la aseguradora
    empresa: '' //mapfre, mutua, etc...
  }



  // MÉTODOS GENERALES PARA TODOS
  buscarGeneral() {
    if (this.dato_buscado.dato.length >= 3) {
      this.rutasService
        .traerDatosBuscador(this.dato_buscado)
        .subscribe((resultado: any) => {
          this.array_buscador = resultado; //Esto es el array
          this.cdr.detectChanges();
          console.log(resultado);
        });
    } else {
      this.array_buscador = [];
    }
  }

  // MÉTODOS VEHICULOS
  buscarVehiculos() {
    if (this.dato_vehiculo.dato.length > 3) {
      this.rutasService
      .traerDatosVehiculos(this.dato_vehiculo)
      .subscribe((resultado: any) => {
        this.array_buscador_vehiculos = resultado; //Esto es el array
        this.cdr.detectChanges();
        console.log(resultado);
      });
    } else {
      this.array_buscador_vehiculos = [];
    }
  }  


  // MÉTODOS CONDUCTORES
  buscarConductores() {
    if (this.dato_conductor.nombre.length > 1) {
      this.rutasService
      .traerDatosConductores(this.dato_conductor)
      .subscribe((resultado: any) => {
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




  
  //MÉTODOS FORMULARIO
  quitarCliente(id_cliente_buscado: any) {
    this.rutas_guardadas = this.rutas_guardadas.filter(
      cliente => cliente.id_contenedor !== id_cliente_buscado
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
}
