import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { verifyHostBindings } from '@angular/compiler';


@Component({
  selector: 'app-cliente.component',
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css',
})
export class ClienteComponent implements OnInit{

  cliente = {
    id_cliente: '',
    PointID: '',
    nombre: '',
    cif: '',
    telefono: '',
    notas: '',
    localidad: '',
    direccion: ''
  };

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

  ngOnInit(){

    // this.route.params.subscribe((params: Params) => this.id_cliente = params['id_cliente']);
    this.route.params.subscribe({
      next: (response: any) => {
          this.cliente.id_cliente = response.id_cliente; // Asignar la respuesta al array
          console.log('Id cargado:', (this.cliente.id_cliente = response.id_cliente));
        },
    });
    this.cargarClienteEspecifico();
  }


  cargarClienteEspecifico(){
    this.servicioCliente.obtenerClienteEspecifico(this.cliente).subscribe(
      (resultado:any) =>{
        this.cliente = resultado;
        console.log (resultado);
        this.cdr.detectChanges();
  });
  }

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
    this.cliente = this.cliente_nuevo; //ESTAS 3 LINEAS PARA REDIRIGIR CREO QUE ESTAN MAL
    this.cdr.detectChanges();
    this.router.navigate(['cliente', this.cliente.id_cliente]); 
    } else {
      console.log("PointID y Nombre es obligatorio");
    }
  }
}
