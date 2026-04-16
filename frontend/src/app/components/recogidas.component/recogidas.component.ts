import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecogidasService } from '../../services/recogidas.service';

@Component({
  selector: 'app-recogidas.component',
  imports: [FormsModule, CommonModule],
  templateUrl: './recogidas.component.html',
  styleUrl: './recogidas.component.css',
})
export class RecogidasComponent {
  active = 'horeca';

  //aqui almacenaremos los datos que vienen del formulario
  recogida_nueva = {
    //datos del contenedor
    id_contenedor: "",
    fecha: "",
    id_ruta: "",
    litros_recogidos: "",
    visitado: true,
    recogida: true,
    bidones_recogidos: "",
    bidones_entregados: "",
    notas: "",
    //datos del producto
    desengrasante: "",
    fregasuelo: "",
    lavavajilla: "",
    jabon_manos: "",
    higienizante: "",
    wc_banos: "",
    limpia_cristales: "",
    lejia: "",
    bayeta: "",
    filtros: "",
    dinero: "",
    //datos del cliente
    nombre: "",
    cif:"",
    telefono: "",
    direccion: "",
    municipio: "",
    cod_postal: "",
    provincia:"",
    pais:""
  };

  horeca_buscado = {
    nombre: "",
    municipio: "",
    provincia: ""
  };

  horecas: any[] = [];

  //constructor
  constructor(
    // private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private recogidaService: RecogidasService,
    private router: Router,
  ) {}

  buscarHoreca(){
    if((this.horeca_buscado.nombre.length) >= 3){
    this.recogidaService.traerHorecasPorNombre(this.horeca_buscado).subscribe((resultado: any) => {
      this.horecas = resultado; //Esto es el array
      this.cdr.detectChanges();
      console.log(resultado);
    });
    }
    else{
      this.horecas = [];
    }
  }

  seleccionarHoreca(horeca: any) { //Este Horeca es el seleccionado dentro del array Horecas, de la lista.

    this.recogida_nueva.nombre = horeca.nombre;
    this.recogida_nueva.cif = horeca.cif;
    this.recogida_nueva.telefono = horeca.telefono;
    this.recogida_nueva.direccion = horeca.direccion;
    this.recogida_nueva.municipio = horeca.municipio;
    this.recogida_nueva.cod_postal = horeca.cod_postal;
    this.recogida_nueva.provincia = horeca.provincia;
    this.recogida_nueva.pais = horeca.pais;

    this.horeca_buscado.nombre = "";
    this.buscarHoreca();

  }

  insertarRecogida(recogida_nueva: any) {
    if (recogida_nueva.id_contenedor != '') {
      this.recogidaService.nuevaRecogida(recogida_nueva).subscribe({
        next: (respuesta: any) => {
          this.recogida_nueva = respuesta;
          console.log('Recogida añadida:', respuesta);
        },
        error: (error) => {
          console.error('Error al añadir recogida:', error);
        },
        complete: () => {
          console.log('Recogida añadida');
        },
      });
      this.cdr.detectChanges();
      this.router.navigate(['dashboard']);
    } else {
      console.log('no hay nada que recoger');
    }
  }

  limpiarFormulario(){
    
    //datos del contenedor
    this.recogida_nueva.id_contenedor = "",
    this.recogida_nueva.fecha = "",
    this.recogida_nueva.id_ruta = "",
    this.recogida_nueva.litros_recogidos = "",
    this.recogida_nueva.visitado = true,
    this.recogida_nueva.recogida = true,
    this.recogida_nueva.bidones_recogidos = "",
    this.recogida_nueva.bidones_entregados = "",
    this.recogida_nueva.notas = "",
    //datos del producto
    this.recogida_nueva.desengrasante = "",
    this.recogida_nueva.fregasuelo = "",
    this.recogida_nueva.lavavajilla = "",
    this.recogida_nueva.jabon_manos = "",
    this.recogida_nueva.higienizante = "",
    this.recogida_nueva.wc_banos = "",
    this.recogida_nueva.limpia_cristales = "",
    this.recogida_nueva.lejia = "",
    this.recogida_nueva.bayeta = "",
    this.recogida_nueva.filtros = "",
    this.recogida_nueva.dinero = "",
    //datos del cliente
    this.recogida_nueva.nombre = "",
    this.recogida_nueva.cif = "",
    this.recogida_nueva.telefono = "",
    this.recogida_nueva.direccion = "",
    this.recogida_nueva.municipio = "",
    this.recogida_nueva.cod_postal = "",
    this.recogida_nueva.provincia = "",
    this.recogida_nueva.pais = ""

  }

  //este método es para que el boton de "HORECA" "RESPOL", "CONTENEDOR" se quede marcado y mostrar el formulario correspondiente
  seleccionarTipo(tipo: any) {
    this.active = tipo;
  }

  imprimirCosas(){
    console.log(this.recogida_nueva);
  }

  cambiarEstadoVisitado(estado:boolean){
    this.recogida_nueva.visitado = estado;
  }

  cambiarEstadoRecogido(estado:boolean){
    this.recogida_nueva.recogida = estado;
  }
}
