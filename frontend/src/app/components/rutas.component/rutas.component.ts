import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientesService } from '../../services/clientes.service';

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
    private clienteService: ClientesService,
    private router: Router,
  ) { }


  dato_buscado = {
    dato: ''
  }

  dato_conductor = {
    nombre: ''
  }

  array_buscador: any[] = [];

  array_buscador_conductores: any[] = [];

  rutas_guardadas: any[] = [];

  buscarGeneral() {
    if (this.dato_buscado.dato.length >= 3) {
      this.clienteService
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

  meterEnRuta(cliente_encontrado: any) {
    this.rutas_guardadas.push(cliente_encontrado);
    this.cdr.detectChanges();
  }

  buscarConductores() {
    if (this.dato_conductor.nombre.length > 1) {
      this.clienteService
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

}
