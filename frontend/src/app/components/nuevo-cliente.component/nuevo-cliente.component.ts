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
    tipo_contenedor: '',
    PointID: '', 
    nombre_cliente: '',
    cif_cliente: '',
    telefono_cliente: '',
    tipo_legal: '',
    direccion: '',
    cod_postal: '',
    municipio: '',
    provincia: '',
    pais: ''
  };

  //HAY QUE PONER ACTIVO POR DEFECTO A SI

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private clienteService: ClientesService,
    private router: Router
  ){}

  anadirCliente(cliente_nuevo: any){

    if(cliente_nuevo.PointID != "" && cliente_nuevo.nombre != ""){
      this.clienteService.anadirCliente(cliente_nuevo).subscribe({
        next: (respuesta:any) => {
          if(respuesta == false){
            this.router.navigate(['cagaste']); 
          } else {
          this.router.navigate(['confirmado', respuesta]); 
          console.log('Cliente añadido:', respuesta);
          }
        },
        error: (error) => {
          console.error('Error al añadir cliente:', error);
        },
        complete: () => {
          console.log('Cliente añadido');
        }
      })
      this.cdr.detectChanges();
    } 
    else {
      console.log("PointID y Nombre es obligatorio");
    }
  }
}
