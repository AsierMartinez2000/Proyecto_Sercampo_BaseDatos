import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientesService } from '../../services/clientes.service';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-dashboard.component',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit{  //implements OnInit, AfterViewInit{

  //El atributo de nuestro componente es un array.
  //Queremos guardar aquí todos los clientes cuando nos lleguen del backend.
  
  cliente = {nombre: ""};
  clientes: any[] = [];

  //Para usar los metodos de los "componentes" importados que vienen por defecto en Angular
  //Tendremos que inicializar el atributo que se refiere a ellos.
  constructor(
    private router: Router,
    private clienteService: ClientesService,
  ){}

  
  // Esto carga al final de cargar el componente
  ngOnInit() {

    this.cargarClientes()

  }

  //Este metodo carga todos los clientes, va en OnInit, porque la primera vez que entra carga todos.
  cargarClientes(){
    this.clientes = this.clienteService.obtenerClientes();
  }

  //Metodo que se llama al escribir en el INPUT. Busca en base al nombre con LIKE.
  cargarClientesPorNombre(){
    this.clienteService.obtenerClienteNombre(this.cliente).subscribe(
      (resultado:any) =>{
        this.clientes = resultado;
        console.log(resultado)
      
  });
  }

  // Esto se carga después de que la vista (HTML) del componente y sus hijos ya están renderizados en el DOM
  // ngAfterViewInit(){
  //   this.cargarClientesPorNombre();
  // }

 
}
