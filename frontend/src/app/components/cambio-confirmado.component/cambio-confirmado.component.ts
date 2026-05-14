import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { OnInit } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { ChangeDetectorRef } from '@angular/core';
export const renderMode = 'ssr';

@Component({
  selector: 'app-cambio-confirmado.component',
  imports: [RouterModule],
  templateUrl: './cambio-confirmado.component.html',
  styleUrl: './cambio-confirmado.component.css',
})
export class CambioConfirmadoComponent implements OnInit{

  clientes: any[] = [];

  cliente:any = null; //Mejor inicializar a null en este caso para evitar que el boton Ir a aparezca vacio.

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private clienteService: ClientesService,
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe({
      next: (params: any) => {
        const idCliente = params['id_cliente'];
        if (idCliente) {
          // Solo intentar cargar si hay un ID válido
          this.cliente = {
            id_cliente: idCliente,
            id_contenedor: "",
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
          };
          this.cargarClienteEspecifico();
        } else {
          console.log('No se proporcionó ID de cliente');
        }
      },
      error: (error) => {
        console.error('Error al obtener parámetros:', error);
      }
    });
  }
  
  redirigirCliente(id_cliente: any){
    console.log("Navegando");
    this.router.navigate(['cliente', id_cliente]);
    };
    

  cargarClienteEspecifico() {
    this.clienteService.obtenerClienteEspecifico(this.cliente).subscribe((resultado: any) => {
      this.cliente = resultado;
      this.cdr.detectChanges();
      console.log(resultado);
    });
  } 
}
