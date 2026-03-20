import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard.component',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit{  //implements OnInit, AfterViewInit{

  private url = 'http://localhost/proyecto_sercampo_basedatos/backend/index.php'
  //El atributo de nuestro componente es un array.
  //Queremos guardar aquí todos los clientes cuando nos lleguen del backend.
  
  clientes: any[] = [];

  //Para usar los metodos de los "componentes" importados que vienen por defecto en Angular
  //Tendremos que inicializar el atributo que se refiere a ellos.
  constructor(
    private router: Router,
    private httpClient: HttpClient
  ){}

  // // Esto carga al final de cargar el componente

  ngOnInit(): void {
    this.recuperarClientes(); // Llamar aquí
  }

  // Esto se carga después de que la vista (HTML) del componente y sus hijos ya están renderizados en el DOM
  // ngAfterViewInit(): void {

  // }

  recuperarClientes(){
    return this.httpClient.get(`${this.url}?controller=clientes&action=obtenerClientes`, {
      withCredentials: true
    }).subscribe({
      next: (response: any) => {
        this.clientes = response; // Asignar la respuesta al array
        console.log('Clientes cargados:', this.clientes);
      },
      error: (error) => {
        console.error('Error al cargar clientes:', error);
      }
    });
  }
}
