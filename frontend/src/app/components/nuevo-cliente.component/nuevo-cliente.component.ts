import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecogidasService } from '../../services/recogidas.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-nuevo-cliente.component',
  imports: [FormsModule, CommonModule],
  templateUrl: './nuevo-cliente.component.html',
  styleUrl: './nuevo-cliente.component.css',
})
export class NuevoClienteComponent implements OnInit{

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
    pais: '',
    cod_eess: ''
  };

  fallo_insertar:boolean = false;

  deshabilitarEscritura: boolean = false;

  array_provincias: any[] = [];

  array_municipios: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private clienteService: ClientesService,
    private router: Router,
    private recogidasService: RecogidasService,
    private adminService: AdminService
  ){}

  ngOnInit(): void {
    this.cargarSelects();
    this.cdr.detectChanges();
  }

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

  onTipoLegalChange(valor: string) {
    switch (valor) {
      case 'Horeca':
        console.log('Seleccionado Horeca');
        this.cambiarFormularioVacio();
        break;
      case 'EESS Repsol':
        console.log('Seleccionado EESS Repsol');
        this.cambiarFormularioVacio();
        break;
      case 'Contenedor':
        console.log('Seleccionado Contenedor');
        this.cambiarFormularioContenedor();
        break;
      default:
        console.log('Opción no reconocida:', valor);
        break;
    }
  }

  onProvinciaChange() {
    this.cdr.detectChanges();
    this.adminService.cargarMunicipios(this.cliente_nuevo).subscribe((resultado: any) => {
      this.array_municipios = resultado;
      this.cdr.detectChanges();
    })
  }

  cambiarFormularioContenedor(){
    this.cliente_nuevo.nombre_cliente = "Contenedor Vía Pública";
    this.cliente_nuevo.telefono_cliente = "969240610";
    this.cliente_nuevo.cif_cliente = "B16249906";
    this.cliente_nuevo.cod_eess = "";

    this.deshabilitarEscritura = true;
    this.cdr.detectChanges();
  }

  cambiarFormularioVacio(){
    if(this.cliente_nuevo.nombre_cliente == "Contenedor Vía Pública" || this.cliente_nuevo.telefono_cliente == "969240610" || this.cliente_nuevo.cif_cliente == "B16249906"){

      this.cliente_nuevo.nombre_cliente = "";
      this.cliente_nuevo.telefono_cliente = "";
      this.cliente_nuevo.cif_cliente = "";
    }
    
    this.cliente_nuevo.cod_eess = "";
    
    this.deshabilitarEscritura = false;
    this.cdr.detectChanges();
  }



   comprobarFormulario() {
    if ((this.cliente_nuevo.PointID == '' || this.cliente_nuevo.nombre_cliente == '') || (this.cliente_nuevo.cif_cliente == '') || (this.cliente_nuevo.tipo_legal == ''
      || this.cliente_nuevo.direccion == '' || this.cliente_nuevo.municipio == '' || this.cliente_nuevo.tipo_contenedor == '' || this.cliente_nuevo.provincia == '')) {
      this.falloInsertar();
    }

    if (this.cliente_nuevo.tipo_legal == "EESS Repsol"){
      if(this.cliente_nuevo.cod_eess == '' || this.cliente_nuevo.cod_eess.length < 3){
        this.falloInsertar();
      }
    }
  }

   falloInsertar(){
    this.fallo_insertar = true;
  }

  cerrarFallo(){
    setTimeout(() => {
      this.fallo_insertar = false;
    }, 50);
  }

  cargarSelects(){
    this.recogidasService.cargarProvincias().subscribe((resultado: any) => {
      this.array_provincias = resultado;
      this.cdr.detectChanges();
    })
  }

}
