import { Component, OnInit, AfterViewInit, ChangeDetectorRef} from '@angular/core';
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

  cliente = {
    dato: "",
    tipo_legal: ""
  };

  clientes: any[] = [];

  active: string = '';

  //Para usar los metodos de los "componentes" importados que vienen por defecto en Angular
  //Tendremos que inicializar el atributo que se refiere a ellos.
  constructor(
    private router: Router,
    private clienteService: ClientesService,
    private cdr: ChangeDetectorRef
  ){}

  
  // Esto carga al final de cargar el componente
  ngOnInit() {

    this.cargarClientes()

  }

  //Este metodo carga todos los clientes, va en OnInit, porque la primera vez que entra carga todos.
  cargarClientes(){
    this.clientes = this.clienteService.obtenerClientes();
  }

  cargarClientesGeneral(){
    this.clienteService.obtenerClienteGeneral(this.cliente).subscribe(
      (resultado:any) =>{
        console.log(resultado);
        this.clientes = resultado;
        this.cdr.detectChanges();
  });
  }

  redirigirCliente(id_cliente: any){
    console.log("Navegando");
    this.router.navigate(['cliente', id_cliente]);
    };

      
  seleccionarTipo(tipo: any){
      this.active = tipo;
      this.cliente.tipo_legal = tipo;
      this.cargarClientesGeneral()
  }

  }



 

