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

  productosKeys = ['Desengrasante', 'Fregasuelo', 'Lavavajilla', 'Jabón de Manos', 'Higienizante', 'WC Baños', 'Limpia Cristales', 'Lejía', 'Bayetas', 'Filtros', 'Dinero']

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

    this.estadisticas.horecas_recogidos = 0;
    this.estadisticas.contenedores_recogidos = 0;
    this.estadisticas.eess_recogidos = 0;

    this.estadisticas.recogidas_totales = 0;

    this.estadisticas.euros_entregado = 0;
  
    for(let recogida of this.array_recogidas){

      this.estadisticas.litros += recogida.litros_recogidos;

      if(recogida.tipo_legal == "Horeca"){
        this.estadisticas.horecas_recogidos++;
      }

      if(recogida.tipo_legal == "Contenedor"){
        this.estadisticas.contenedores_recogidos++;
      }

      if(recogida.tipo_legal == "EESS Repsol"){
        this.estadisticas.eess_recogidos++;
      }

      this.estadisticas.recogidas_totales++;

      this.estadisticas.euros_entregado =  this.estadisticas.euros_entregado + this.calcularTotalIntercambio(recogida);

    }
      this.cdr.detectChanges();
    console.log(this.estadisticas.litros);
  }

  calcularTotalIntercambio(recogida: any) {
    let total = 0;
    for (const key of this.productosKeys) {
      if (key == recogida[key + '_nombre']) {
        total += recogida[key + '_cantidad'] * recogida[key + '_coste'];
        console.log(total);
      }
    }
    recogida.total_intercambio = total;
    return total;
}

}
