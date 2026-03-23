import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientesService } from '../../services/clientes.service';


@Component({
  selector: 'app-dashboard.component',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit{  //implements OnInit, AfterViewInit{

    //El atributo de nuestro componente es un array.
  //Queremos guardar aquí todos los clientes cuando nos lleguen del backend.

  clientes: any[] = [];
  datos = {"nombre" : "Bar La Plaza"};
 
  //Para usar los metodos de los "componentes" importados que vienen por defecto en Angular
  //Tendremos que inicializar el atributo que se refiere a ellos.
  constructor(
    private router: Router,
    private clienteService: ClientesService
  ){}

  // // Esto carga al final de cargar el componente

 ngOnInit() {
    // Llamar aquí los métodos que vengan del servicios
    // this.recuperarClientes(); 
    // this.clientes = this.clienteService.obtenerClientes();
    // this.clientes = this.clienteService.obtenerClienteNombre(this.datos);
    // console.log(this.clientes);
    // console.log(this.datos);
  }



  // Esto se carga después de que la vista (HTML) del componente y sus hijos ya están renderizados en el DOM
  // ngAfterViewInit(): void {

  // }

 
}
