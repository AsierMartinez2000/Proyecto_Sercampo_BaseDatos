import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecogidasService } from '../../../services/recogidas.service';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zonas.component',
  imports: [CommonModule, FormsModule],
  templateUrl: './zonas.component.html',
  styleUrl: './zonas.component.css',
})
export class ZonasComponent implements OnInit{

  constructor(
    private cdr: ChangeDetectorRef,
    private recogidasService: RecogidasService,
    private adminService: AdminService,
    private router: Router
  ) {}

  array_provincias: any[] = [];

  array_municipios: any[] = [];

  provincia_seleccionada = {
    provincia: ""
  }

  municipio_nuevo = {
    municipio: "",
    provincia: "",
    pais: "España",
    provincia_nueva: ""
  }

  ngOnInit() {
    this.cargarSelects();
    this.cdr.detectChanges();
  }


  cargarSelects(){
    this.recogidasService.cargarProvincias().subscribe((resultado: any) => {
      this.array_provincias = resultado;
      this.cdr.detectChanges();
    })
  }

  onProvinciaChange() {
    this.cdr.detectChanges();
    this.adminService.cargarMunicipios(this.provincia_seleccionada).subscribe((resultado: any) => {
      this.array_municipios = resultado;
      this.cdr.detectChanges();
    })
  }

  nuevoMunicipio(municipio_nuevo: any){

    if(municipio_nuevo.municipio != '' && municipio_nuevo.provincia != '' && municipio_nuevo.pais != ''){
      this.adminService.insertarMunicipio(municipio_nuevo).subscribe({
          next: (respuesta: any) => {
            console.log('Municipio añadido:', respuesta);
          },
          error: (error) => {
            console.error('Error al añadir municipio:', error);
          },
          complete: () => {
            console.log('Municipio añadido');
            this.cdr.detectChanges();
            this.router.navigate(['confirmado', ""]); 
          },
        });
    }
  }
}
