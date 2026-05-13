import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecogidasService } from '../../../services/recogidas.service';
import { AdminService } from '../../../services/admin.service';

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
    private adminService: AdminService
  ) {}

  array_provincias: any[] = [];

  array_municipios: any[] = [];

  provincia_seleccionada = {
    provincia: ""
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
}
