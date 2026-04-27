import { DatePipe, CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecogidasService } from '../../services/recogidas.service';

@Component({
  selector: 'app-ultimas-recogidas.component',
  imports: [DatePipe,CommonModule, FormsModule],
  templateUrl: './ultimas-recogidas.component.html',
  styleUrl: './ultimas-recogidas.component.css',
})
export class UltimasRecogidasComponent implements OnInit {

  datos = {
    fecha : new Date()
  };
  
  estadisticas = {
    litros: 0,
    recogidas_totales: 0,
    euros_entregado: 0,
    horecas_recogidos: 0,
    contenedores_recogidos: 0,
    eess_recogidos: 0
  };

  array_recogidas: any[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private recogidasService: RecogidasService
  ) {
  this.datos.fecha.setMonth(this.datos.fecha.getMonth() - 1);
  }
  
  ngOnInit() {
    console.log(this.datos.fecha.toLocaleDateString('en-CA'));
    this.cargarRecogidas();
    this.cdr.detectChanges();
  }

  cargarRecogidas(){
    this.recogidasService.obtenerRecogidas(this.datos).subscribe((resultado: any) => {
      console.log(resultado);
      this.array_recogidas = resultado;
      this.calcularEstadisticas();      
    });
  }

  calcularEstadisticas(){
   this.estadisticas.litros = 0;
      for(let recogida of this.array_recogidas){
      console.log('Litros de esta recogida:', recogida.litros_recogidos);
      this.estadisticas.litros += recogida.litros_recogidos;
      console.log('Acumulado hasta ahora:', this.estadisticas.litros);
      }
      this.cdr.detectChanges();
    console.log(this.estadisticas.litros);
  }



}
