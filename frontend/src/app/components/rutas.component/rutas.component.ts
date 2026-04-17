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
  ) {}


  dato_buscado = {
    dato: ''
  }

  array_buscador: any[] = [];

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

  meterEnRuta(cliente_encontrado:any){
  }

}
