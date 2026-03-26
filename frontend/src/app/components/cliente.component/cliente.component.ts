import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente.component',
  imports: [],
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


  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private servicioCliente: ClientesService
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

}
