import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nuevo-cliente.component',
  imports: [FormsModule, CommonModule],
  templateUrl: './nuevo-cliente.component.html',
  styleUrl: './nuevo-cliente.component.css',
})
export class NuevoClienteComponent {

cliente_nuevo = {
    id_cliente: '',
    PointID: '',
    nombre: '',
    cif: '',
    telefono: '',
    notas: '',
    localidad: '',
    direccion: ''
  };


  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private servicioCliente: ClientesService,
    private router: Router
  ){}


  anadirCliente(cliente_nuevo: any){

    if(cliente_nuevo.PointID != "" && cliente_nuevo.nombre != ""){
    this.servicioCliente.anadirCliente(cliente_nuevo).subscribe({
      next: (respuesta:any) => {
        this.cliente_nuevo = respuesta;
        console.log('Cliente añadido:', respuesta);
      },
      error: (error) => {
        console.error('Error al añadir cliente:', error);
      },
      complete: () => {
        console.log('Cliente añadido');
      }
    })
    this.cdr.detectChanges();
    this.router.navigate(['cliente', this.cliente_nuevo.id_cliente]); 
    } else {
      console.log("PointID y Nombre es obligatorio");
    }
  }



}
