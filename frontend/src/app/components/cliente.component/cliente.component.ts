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
export class ClienteComponent implements OnInit {
  cliente = {
      id_contenedor: " ",
      id_cliente: " ",
      PointID: " ",
      nombre: " ",
      cif: " ",
      telefono: " ",
      cod_postal: " ",
      direccion: " ",
      localidad: " ",
      provincia: " ",
      pais: " ",
      tipo: " ",
      tipo_legal: " ",
      activo: ""
  }

  // activado:boolean = true;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private clienteService: ClientesService,
  ) {}
  
  ngOnInit() {
    // this.route.params.subscribe((params: Params) => this.id_cliente = params['id_cliente']);
    this.route.params.subscribe({
      next: (response: any) => {
        this.cliente.id_cliente = response.id_cliente; // Asignar la respuesta al array
        console.log('Id cargado:', (this.cliente.id_cliente = response.id_cliente));
      },
    });
    this.cargarClienteEspecifico();
    
    console.log(this.cliente.activo);
    
    this.cdr.detectChanges();
    
    // if (this.cliente.activo == "Sí") {
    //   this.activado = true;
    // } 
    
    // if(this.cliente.activo == "No"){
    //   this.activado = false;
    // }
  }

  cargarClienteEspecifico() {
    this.clienteService.obtenerClienteEspecifico(this.cliente).subscribe((resultado: any) => {
      this.cliente = resultado;
      console.log(resultado);
      this.cdr.detectChanges();
    });
  }

  modificarCliente() {
    console.log('Navegando');
    this.router.navigate(['modificar', this.cliente.id_cliente]);
  }

  cambiarEstado() {

    if(this.cliente.activo === "Sí"){
      this.cliente.activo = "No";
    } else {
      this.cliente.activo = "Sí";
    }

    this.clienteService.actualizarEstadoCliente(this.cliente).subscribe((resultado: any) => {
      this.cliente = resultado;
      console.log(resultado);
      this.cdr.detectChanges();
    });

    // console.log(this.activado);

  }
}
