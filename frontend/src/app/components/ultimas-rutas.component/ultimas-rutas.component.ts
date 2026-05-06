import { DatePipe, CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RutasService } from '../../services/rutas.service';
import { RecogidasService } from '../../services/recogidas.service';

@Component({
  selector: 'app-ultimas-rutas.component',
  imports: [DatePipe,CommonModule, FormsModule],
  templateUrl: './ultimas-rutas.component.html',
  styleUrl: './ultimas-rutas.component.css',
})
export class UltimasRutasComponent implements OnInit{

  datos = {
    fecha : new Date()
  };

  array_conductores: any[] = [];

  estadisticas = {
    rutas_totales: 0,
    lugares_totales: 0,
  };

  array_rutas: any[] = [];
  
  constructor(
    private cdr: ChangeDetectorRef,
    private rutasService: RutasService,
    private recogidasService: RecogidasService
  ) {
    this.datos.fecha.setMonth(this.datos.fecha.getMonth() - 1);
  }

  ngOnInit() {
    this.cargarRutas();
    this.cargarSelects();
    console.log(this.array_conductores);
    this.cdr.detectChanges();
  }

  cargarRutas(){
    this.rutasService.obtenerRutas(this.datos).subscribe((resultado: any) => {
      this.array_rutas = resultado;
      this.calcularEstadisticas();      
    });
  }

  cargarSelects(){
    this.recogidasService.cargarConductores().subscribe((resultado: any) => {
      this.array_conductores = resultado;
  })
  }

  calcularEstadisticas(){

    this.estadisticas.rutas_totales = 0;

  
    for(let ruta of this.array_rutas){

      this.estadisticas.rutas_totales++;

      // if(ruta.nombre_conductor == "Asier"){
      //   this.estadisticas.rutas_Asier++;
      // }

    }
      this.cdr.detectChanges();
    console.log(this.estadisticas.rutas_totales);
  }

  calcularPrueba(id_conductor:any): Number{

    let total_conductor = 0;

    for(let ruta of this.array_rutas){

      if(ruta.id_conductor == id_conductor){
        total_conductor++;
      }

    }

    return total_conductor;
  }


}
