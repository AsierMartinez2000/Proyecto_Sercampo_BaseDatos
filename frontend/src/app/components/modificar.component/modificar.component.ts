import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-modificar.component',
  imports: [CommonModule, FormsModule],
  templateUrl: './modificar.component.html',
  styleUrl: './modificar.component.css',
})
export class ModificarComponent implements OnInit {

   constructor(
    private route: ActivatedRoute,
    // private router: Router,
    private cdr: ChangeDetectorRef,
    private clienteService: ClientesService
  ){ 
  }

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
      activo: " "
  }


  ngOnInit(): void {

  this.route.params.subscribe({
      next: (response: any) => {
          this.cliente.id_cliente = response.id_cliente; // Asignar la respuesta al array
          console.log('Id cargado:', (this.cliente.id_cliente = response.id_cliente));
        },
    });
    this.cargarClienteEspecifico();
  }


  cargarClienteEspecifico(){
    this.clienteService.obtenerClienteEspecifico(this.cliente).subscribe(
      (resultado:any) =>{
        this.cliente = resultado;
        console.log (resultado);
        this.cdr.detectChanges();
  });
  }


  actualizarCliente(){
        this.clienteService.actualizarCliente(this.cliente).subscribe((resultado:any) =>{
        this.cliente = resultado;
        console.log (resultado);
        this.cdr.detectChanges();
  });
  }



}
