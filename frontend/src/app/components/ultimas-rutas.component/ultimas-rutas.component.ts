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
    fechaInicial : new Date(),
    fechaFinal: new Date(),
    conductor: '', //Aqui tengo el id_conductor
    vehiculo: '', //Aqui tengo la matricula
    //ESTOS 3 DE DEBAJO NO SE USAN POR EL MOMENTO
    tipo_legal: '',
    municipio: '',
    provincia: ''
  };

  array_rutas: any[] = []; //Este array almacena todas las rutas que hay que desplegar

  estadisticas = {
    rutas_totales: 0,
    lugares_totales: 0,
  };

  array_conductores: any[] = []; //Estos array sirven para los SELECT de los filtros

  array_vehiculos: any[] = [];

  array_provincias: any[] = []; //ESTE SE CARGA PERO NO SE USA
  
  constructor(
    private cdr: ChangeDetectorRef,
    private rutasService: RutasService,
    private recogidasService: RecogidasService
  ) {
    this.datos.fechaInicial.setMonth(this.datos.fechaInicial.getMonth() - 1);
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

    this.rutasService.cargarVehiculos().subscribe((resultado: any) => {
      this.array_vehiculos = resultado;
    })

    //PROVINCIAS NO SE USA DE MOMENTO
    this.recogidasService.cargarProvincias().subscribe((resultado: any) => {
        this.array_provincias = resultado;
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

  
  getTipoClass(tipo_legal:string): String{
     switch (tipo_legal) {
        case 'Horeca':
            return 'horeca';
        case 'EESS Repsol':
            return 'eess';
        case 'Contenedor':
            return 'contenedor';
        default:
            return 'tipo-default'; 
    }

  }

}
