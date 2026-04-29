import { DatePipe, CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RutasService } from '../../services/rutas.service';

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

  estadisticas = {
    rutas_totales: 0,
    lugares_totales: 0,
    rutas_Asier: 0,
  };

  array_rutas: any[] = [];
  
  constructor(
    private cdr: ChangeDetectorRef,
    private rutasService: RutasService,
  ) {
    this.datos.fecha.setMonth(this.datos.fecha.getMonth() - 1);
  }

  ngOnInit() {
    this.cargarRutas();
    this.cdr.detectChanges();
    this.calcularEstadisticas(); 
    this.cdr.detectChanges();
  }

  cargarRutas(){
    this.rutasService.obtenerRutas(this.datos).subscribe((resultado: any) => {
      console.log(resultado);
      this.array_rutas = resultado;
      this.cdr.detectChanges();      
    });
  }

  calcularEstadisticas(){

    this.estadisticas.rutas_Asier = 0;

    this.estadisticas.rutas_totales = 0;
  
    for(let ruta of this.array_rutas){

      this.estadisticas.rutas_totales++;

      if(ruta.nombre_conductor == "Asier"){
        this.estadisticas.rutas_Asier++;
      }

    }
      this.cdr.detectChanges();
    console.log(this.estadisticas.rutas_totales);
  }


}
