import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
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

  cliente = {
      id_contenedor: "",
      id_cliente: "",
      PointID: "",
      nombre: "",
      cif: "",
      telefono: " ",
      cod_postal: " ",
      direccion: " ",
      municipio: " ",
      provincia: " ",
      pais: " ",
      tipo: " ",
      tipo_legal: " ",
      activo: ""
  }


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private clienteService: ClientesService,
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe({
      next: (response: any) => {
        this.cliente.id_cliente = response.id_cliente; // Asignar la respuesta al array
        console.log('Id cargado:', (this.cliente.id_cliente = response.id_cliente));
      },
    });
    this.cargarClienteEspecifico();
    this.cargarClientes();
  }

  //Este metodo carga todos los clientes, va en OnInit, porque la primera vez que entra carga todos.
  cargarClientes(){
    this.clientes = this.clienteService.obtenerClientes();;
  }

  
  redirigirCliente(id_cliente: any){
    console.log("Navegando");
    this.router.navigate(['cliente', id_cliente]);
    };
    

    cargarClienteEspecifico() {
    this.clienteService.obtenerClienteEspecifico(this.cliente).subscribe((resultado: any) => {
      this.cliente = resultado;
      console.log(resultado);
    });
  } 
}
