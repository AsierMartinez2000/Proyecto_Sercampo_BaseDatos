import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecogidasService } from '../../services/recogidas.service';
import { ViewportScroller } from '@angular/common';
import { log } from 'console';
import { RutasService } from '../../services/rutas.service';

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
    id_contenedor: '',
    fecha: '',
    id_ruta: '',
    id_conductor: '',
    litros_recogidos: 0,
    visitado: true,
    recogida: true,
    bidones_recogidos: 0,
    bidones_entregados: 0,
    notas: '',
    //datos del producto
    desengrasante: 0,
    fregasuelo: 0,
    lavavajilla: 0,
    jabon_manos: 0,
    higienizante: 0,
    wc_banos: 0,
    limpia_cristales: 0,
    lejia: 0,
    bayeta: 0,
    filtros: 0,
    dinero: 0,
    //datos del cliente
    nombre: '',
    cif: '',
    telefono: '',
    direccion: '',
    municipio: '',
    cod_postal: '',
    provincia: '',
    pais: '',
  };

  cont_recogida_nueva = {
    //datos del contenedor
    id_contenedor: '', //estoy hay que sacarlo porque los contenedores son varios clietnes
    fecha: '',
    id_ruta: '',
    id_conductor: '',
    litros_recogidos: 0,
    visitado: true,
    recogida: true,
    bidones_recogidos: '', // esto igual no hace falta mostrarlo luego
    bidones_entregados: '', // esto igual no hace falta mostrarlo luego
    notas: '',
    //datos del cliente
    nombre: '',
    cif: '',
    telefono: '',
    direccion: '',
    municipio: '',
    cod_postal: '',
    provincia: '',
    pais: '',
  };

  eess_recogida_nueva = {
    //datos del contenedor
    id_contenedor: '', //estoy hay que sacarlo porque los contenedores son varios clietnes
    fecha: '',
    id_ruta: '',
    id_conductor: '',
    litros_recogidos: 0,
    visitado: true,
    recogida: true,
    bidones_recogidos: '', // esto igual no hace falta mostrarlo luego
    bidones_entregados: '', // esto igual no hace falta mostrarlo luego
    notas: '',
    //datos del cliente
    nombre: '',
    cif: '',
    telefono: '',
    direccion: '',
    municipio: '',
    cod_postal: '',
    provincia: '',
    pais: '',
  };

  horeca_buscado = {
    nombre: '',
  };

  contenedor_buscado = {
    dato: '', //aqui será dirección o municipio independientemente
  };

  EESS_buscado = {
    codigo: '',
  };

  //BUSCADOR Y SELECTOR DE CONDUCTOR

  dato_conductor = {
    nombre: ''
  }

  array_buscador_conductores: any[] = [];

  conductor_seleccionado = {
    id_conductor: '',
    nombre: '',
    email: ' '
  }

  //almacenar los horecas
  horecas: any[] = [];

  //almacenar los contenedores
  array_contenedores: any[] = [];

  // almacenar eess
  array_eess: any[] = [];

  // Variable para el modal de error
  fallo_recogida: boolean = false;

  //constructor
  constructor(
    // private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private recogidaService: RecogidasService,
    private rutasService: RutasService,
    private router: Router,
    private viewportScroll: ViewportScroller,
  ) {}

  // MÉTODOS PARA HORECAS
  buscarHoreca() {
    if (this.horeca_buscado.nombre.length >= 3) {
      this.recogidaService
        .traerHorecasPorNombre(this.horeca_buscado)
        .subscribe((resultado: any) => {
          this.horecas = resultado; //Esto es el array
          this.cdr.detectChanges();
          console.log(resultado);
        });
    } else {
      this.horecas = [];
    }
  }

  seleccionarHoreca(horeca: any) {
    //Este Horeca es el seleccionado dentro del array Horecas, de la lista.
    this.recogida_nueva.id_contenedor = horeca.id_contenedor;
    this.recogida_nueva.nombre = horeca.nombre;
    this.recogida_nueva.cif = horeca.cif;
    this.recogida_nueva.telefono = horeca.telefono;
    this.recogida_nueva.direccion = horeca.direccion;
    this.recogida_nueva.municipio = horeca.municipio;
    this.recogida_nueva.cod_postal = horeca.cod_postal;
    this.recogida_nueva.provincia = horeca.provincia;
    this.recogida_nueva.pais = horeca.pais;

    this.horeca_buscado.nombre = '';
    this.buscarHoreca();
  }

  insertarRecogidaHoreca() {
      this.recogidaService.nuevaRecogidaHoreca(this.recogida_nueva).subscribe({
        next: (respuesta: any) => {
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
      this.limpiarFormulario();
    }
  

  cambiarHorecaVisitado(estado: boolean) {
    this.recogida_nueva.visitado = estado;
  }

  cambiarHorecaRecogido(estado: boolean) {
    this.recogida_nueva.recogida = estado;
  }

  // MÉTODOS PARA CONTENEDOR
  buscarContenedor() {
    if (this.contenedor_buscado.dato.length >= 3) {
      this.recogidaService
        .traerContenedorPorDato(this.contenedor_buscado)
        .subscribe((resultado: any) => {
          this.array_contenedores = resultado; //Esto es el array
          this.cdr.detectChanges();
          console.log(resultado);
        });
    } else {
      this.array_contenedores = [];
    }
  }

  seleccionarContenedor(contenedor: any) {
    //Este Contenedor es el seleccionado dentro del array_contenedores de la lista.
    this.cont_recogida_nueva.id_contenedor = contenedor.id_contenedor;
    this.cont_recogida_nueva.nombre = contenedor.nombre;
    this.cont_recogida_nueva.cif = contenedor.cif;
    this.cont_recogida_nueva.telefono = contenedor.telefono;
    this.cont_recogida_nueva.direccion = contenedor.direccion;
    this.cont_recogida_nueva.municipio = contenedor.municipio;
    this.cont_recogida_nueva.cod_postal = contenedor.cod_postal;
    this.cont_recogida_nueva.provincia = contenedor.provincia;
    this.cont_recogida_nueva.pais = contenedor.pais;

    this.contenedor_buscado.dato = '';
    this.buscarContenedor();
  }

  insertarRecogidaContenedor() {
   
      this.recogidaService.nuevaRecogidaContenedor(this.cont_recogida_nueva).subscribe({
        next: (respuesta: any) => {
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
      this.limpiarFormulario();
     
  }

  cambiarContenedorVisitado(estado: boolean) {
    this.cont_recogida_nueva.visitado = estado;
  }

  cambiarContenedorRecogido(estado: boolean) {
    this.cont_recogida_nueva.recogida = estado;
  }

  // MÉTODOS PARA EESS
  buscarEESS() {
    if (this.EESS_buscado.codigo.length >= 3) {
      this.recogidaService.traerEESSPorDato(this.EESS_buscado).subscribe((resultado: any) => {
        this.array_eess = resultado; //Esto es el array
        this.cdr.detectChanges();
        console.log(resultado);
      });
    } else {
      this.array_eess = [];
    }
  }

  seleccionarEESS(eess: any) {
    //Este Contenedor es el seleccionado dentro del array_contenedores de la lista.
    this.eess_recogida_nueva.id_contenedor = eess.id_contenedor;
    this.eess_recogida_nueva.nombre = eess.nombre;
    this.eess_recogida_nueva.cif = eess.cif;
    this.eess_recogida_nueva.telefono = eess.telefono;
    this.eess_recogida_nueva.direccion = eess.direccion;
    this.eess_recogida_nueva.municipio = eess.municipio;
    this.eess_recogida_nueva.cod_postal = eess.cod_postal;
    this.eess_recogida_nueva.provincia = eess.provincia;
    this.eess_recogida_nueva.pais = eess.pais;

    this.EESS_buscado.codigo = '';
    this.buscarEESS();
  }

  insertarEESS() {
    
      this.recogidaService.nuevaRecogidaEESS(this.eess_recogida_nueva).subscribe({
        next: (respuesta: any) => {
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
      this.limpiarFormulario();
    } 
  

  cambiarEESSVisitado(estado: boolean) {
    this.eess_recogida_nueva.visitado = estado;
  }
  cambiarEESSRecogido(estado: boolean) {
    this.eess_recogida_nueva.recogida = estado;
  }

  //MÉTODOS PARA TODOS
  //DEBUG
  imprimirCosas() {
    console.log(this.recogida_nueva);
  }

  //este método es para que el boton de "HORECA" "RESPOL", "CONTENEDOR" se quede marcado y mostrar el formulario correspondiente
  seleccionarTipo(tipo: any) {
    this.active = tipo;
  }

  limpiarFormulario() {
    //datos de horeca
    ((this.recogida_nueva.id_contenedor = ''),
      // this.recogida_nueva.fecha = '',
      (this.recogida_nueva.id_ruta = ''),
      (this.recogida_nueva.litros_recogidos = 0),
      (this.recogida_nueva.visitado = true),
      (this.recogida_nueva.recogida = true),
      (this.recogida_nueva.bidones_recogidos = 0),
      (this.recogida_nueva.bidones_entregados = 0),
      (this.recogida_nueva.notas = ''),
      //datos del producto de Horeca
      (this.recogida_nueva.desengrasante = 0),
      (this.recogida_nueva.fregasuelo = 0),
      (this.recogida_nueva.lavavajilla = 0),
      (this.recogida_nueva.jabon_manos = 0),
      (this.recogida_nueva.higienizante = 0),
      (this.recogida_nueva.wc_banos = 0),
      (this.recogida_nueva.limpia_cristales = 0),
      (this.recogida_nueva.lejia = 0),
      (this.recogida_nueva.bayeta = 0),
      (this.recogida_nueva.filtros = 0),
      (this.recogida_nueva.dinero = 0),
      //datos del cliente de Horeca
      (this.recogida_nueva.nombre = ''),
      (this.recogida_nueva.cif = ''),
      (this.recogida_nueva.telefono = ''),
      (this.recogida_nueva.direccion = ''),
      (this.recogida_nueva.municipio = ''),
      (this.recogida_nueva.cod_postal = ''),
      (this.recogida_nueva.provincia = ''),
      (this.recogida_nueva.pais = ''),
      //datos del contenedor
      //datos del "cliente"
      (this.cont_recogida_nueva.nombre = ''),
      (this.cont_recogida_nueva.cif = ''),
      (this.cont_recogida_nueva.telefono = ''),
      (this.cont_recogida_nueva.direccion = ''),
      (this.cont_recogida_nueva.municipio = ''),
      (this.cont_recogida_nueva.cod_postal = ''),
      (this.cont_recogida_nueva.provincia = ''),
      (this.cont_recogida_nueva.pais = ''),
      //Datos del formulario de contenedor
      (this.cont_recogida_nueva.id_contenedor = ''),
      // this.cont_recogida_nueva.fecha = '',
      (this.cont_recogida_nueva.id_ruta = ''),
      (this.cont_recogida_nueva.litros_recogidos = 0),
      (this.cont_recogida_nueva.visitado = true),
      (this.cont_recogida_nueva.recogida = true),
      (this.cont_recogida_nueva.bidones_recogidos = ''),
      (this.cont_recogida_nueva.bidones_entregados = ''),
      (this.cont_recogida_nueva.notas = ''));

    //datos de EESS
    //datos del cliente
    ((this.eess_recogida_nueva.nombre = ''),
      (this.eess_recogida_nueva.cif = ''),
      (this.eess_recogida_nueva.telefono = ''),
      (this.eess_recogida_nueva.direccion = ''),
      (this.eess_recogida_nueva.municipio = ''),
      (this.eess_recogida_nueva.cod_postal = ''),
      (this.eess_recogida_nueva.provincia = ''),
      (this.eess_recogida_nueva.pais = ''),
      //Datos del formulario de contenedor
      (this.eess_recogida_nueva.id_contenedor = ''),
      // this.eess_recogida_nueva.fecha = '',
      (this.eess_recogida_nueva.id_ruta = ''),
      (this.eess_recogida_nueva.litros_recogidos = 0),
      (this.eess_recogida_nueva.visitado = true),
      (this.eess_recogida_nueva.recogida = true),
      (this.eess_recogida_nueva.bidones_recogidos = ''),
      (this.eess_recogida_nueva.bidones_entregados = ''),
      (this.eess_recogida_nueva.notas = ''));

      //    setTimeout(() => {
      //   this.viewportScroll.scrollToPosition([0, 0]);
      // }, 50);
  }

  comprobarFormularioHoreca() {
    if (this.recogida_nueva.id_contenedor == '' || this.recogida_nueva.fecha == '') {
      this.falloInsertar();
    }
  }
  comprobarFormularioContenedor() {
    if (this.cont_recogida_nueva.id_contenedor == '' || this.cont_recogida_nueva.fecha == '') {
      this.falloInsertar();
    }
  }
  comprobarFormularioEESS() {
    if (this.eess_recogida_nueva.id_contenedor == '' || this.eess_recogida_nueva.fecha == '') {
      this.falloInsertar();
    }
  }

  buscarConductores() {
    if (this.dato_conductor.nombre.length > 1) {
      this.rutasService
      .traerDatosConductores(this.dato_conductor)
      .subscribe((resultado: any) => {
        this.array_buscador_conductores = resultado; //Esto es el array
        this.cdr.detectChanges();
        console.log(resultado);
      });
    } else {
      this.array_buscador_conductores = [];
    }
  }

   seleccionarConductor(conductor: any) {
    //Este conductor es el seleccionado dentro del array_conductores de la lista.
    this.conductor_seleccionado.id_conductor = conductor.id_conductor;
    this.conductor_seleccionado.nombre = conductor.nombre;
    this.conductor_seleccionado.email = conductor.email;

    this.recogida_nueva.id_conductor = conductor.id_conductor;
    this.cont_recogida_nueva.id_conductor = conductor.id_conductor;
    this.eess_recogida_nueva.id_conductor = conductor.id_conductor;

    this.dato_conductor.nombre = '';
    this.buscarConductores();

    this.comprobarIdRuta()
  }

  comprobarIdRuta(){
    if((this.recogida_nueva.fecha != '') && (this.recogida_nueva.id_conductor != '')){
      this.recogidaService.traerIdRuta(this.recogida_nueva).subscribe((resultado: any) => {
        this.recogida_nueva.id_ruta = resultado; //Esto es el id ruta, cuidado no devolver un array.
        this.cdr.detectChanges();
        console.log(resultado);
      });
    }else if((this.cont_recogida_nueva.fecha != '') && (this.cont_recogida_nueva.id_conductor != '')){
      this.recogidaService.traerIdRuta(this.cont_recogida_nueva).subscribe((resultado: any) => {
        this.cont_recogida_nueva.id_ruta = resultado; //Esto es el id ruta, cuidado no devolver un array.
        this.cdr.detectChanges();
        console.log(resultado);
      });
    } else if((this.eess_recogida_nueva.fecha != '') && (this.eess_recogida_nueva.id_conductor != '')){
      this.recogidaService.traerIdRuta(this.eess_recogida_nueva).subscribe((resultado: any) => {
        this.eess_recogida_nueva.id_ruta = resultado; //Esto es el id ruta, cuidado no devolver un array.
        this.cdr.detectChanges();
        console.log(resultado);
      });
    }

  }

  falloInsertar(){
    this.fallo_recogida = true;
  }

  cerrarFallo(){
    setTimeout(() => {
      this.fallo_recogida = false;
    }, 50);
  }
}

