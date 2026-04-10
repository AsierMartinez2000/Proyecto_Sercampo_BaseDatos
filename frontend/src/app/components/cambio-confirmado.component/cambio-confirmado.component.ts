import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OnInit } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-cambio-confirmado.component',
  imports: [RouterModule],
  templateUrl: './cambio-confirmado.component.html',
  styleUrl: './cambio-confirmado.component.css',
})
export class CambioConfirmadoComponent implements OnInit{

  clientes: any[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private clienteService: ClientesService,
  ) {}

  ngOnInit(): void {

    this.cdr.detectChanges();
    this.cargarClientes();
  }

  //Este metodo carga todos los clientes, va en OnInit, porque la primera vez que entra carga todos.
  cargarClientes(){
    this.clientes = this.clienteService.obtenerClientes();
    this.cdr.detectChanges();
  }
}
