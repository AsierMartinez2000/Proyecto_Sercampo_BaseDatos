import { DatePipe, CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecogidasService } from '../../services/recogidas.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-ultimas-recogidas.component',
  imports: [DatePipe,CommonModule, FormsModule],
  templateUrl: './ultimas-recogidas.component.html',
  styleUrl: './ultimas-recogidas.component.css',
})
export class UltimasRecogidasComponent implements OnInit {

  datos = {
    fechaInicial : new Date(),
    fechaFinal: new Date(),
    tipo_legal: '',
    conductor: '', //Aqui tengo el id_conductor
    municipio: '',
    provincia: ''
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

  array_conductores: any[] = [];

  array_provincias: any[] = [];

  array_municipios: any[] = [];

  // dato_conductor = {
  //   nombre: '',
  // };

  // dato_vehiculo = {
  //   dato: '',
  // };

  // //estos arrays son las lista que aparecen cuando buscamos
  // array_buscador_vehiculos: any[] = [];

  // array_buscador_conductores: any[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private recogidasService: RecogidasService,
    private adminService: AdminService
  ) {
  this.datos.fechaInicial.setMonth(this.datos.fechaInicial.getMonth() - 1);
  }
  
  ngOnInit() {
    console.log(this.datos.fechaInicial.toLocaleDateString('en-CA'));
    this.cargarSelects();
    this.cargarRecogidas();
    this.cdr.detectChanges();
  }

  cargarRecogidas(){
    console.log(this.datos);
    this.recogidasService.obtenerRecogidas(this.datos).subscribe((resultado: any) => {
      this.array_recogidas = resultado;
      this.calcularEstadisticas();      
    });
  }

  cargarSelects(){
    this.recogidasService.cargarConductores().subscribe((resultado: any) => {
      this.array_conductores = resultado;
    })

    this.recogidasService.cargarProvincias().subscribe((resultado: any) => {
      this.array_provincias = resultado;
    })
  }

  calcularEstadisticas(){
    this.estadisticas.litros = 0;

    this.estadisticas.horecas_recogidos = 0;
    this.estadisticas.contenedores_recogidos = 0;
    this.estadisticas.eess_recogidos = 0;

    this.estadisticas.recogidas_totales = 0;

    this.estadisticas.euros_entregado = 0;
  
    for(let recogida of this.array_recogidas){

      this.estadisticas.litros = this.estadisticas.litros + recogida.litros_recogidos;

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
  }

  calcularTotalIntercambio(recogida: any) {
    let total = 0;
    for (const key of this.productosKeys) {
      if (key == recogida[key + '_nombre']) {
        total += recogida[key + '_cantidad'] * recogida[key + '_coste'];
      }
    }
    recogida.total_intercambio = total;
    return total;
}

  onProvinciaChange() {
    this.cdr.detectChanges();
    this.adminService.cargarMunicipios(this.datos).subscribe((resultado: any) => {
      this.array_municipios = resultado;
      this.cdr.detectChanges();
    })
  }

}
