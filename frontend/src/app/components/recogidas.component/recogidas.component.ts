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
    id_contenedor: '',
    fecha: '',
    id_ruta: '',
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
    litros_recogidos: 0,
    visitado: true,
    recogida: true,
    bidones_recogidos: null, // esto igual no hace falta mostrarlo luego
    bidones_entregados: null, // esto igual no hace falta mostrarlo luego
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

  //almacenar los horecas
  horecas: any[] = [];

  //almacenar los contenedores
  array_contenedores: any[] = [];

  // almacenar eess
  array_eess: any[] = [];

  //constructor
  constructor(
    // private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private recogidaService: RecogidasService,
    private router: Router,
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
    if (this.recogida_nueva.id_contenedor != '') {
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
      this.router.navigate(['dashboard']);
    } else {
      console.log('no hay nada que recoger');
    }
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
    if (this.cont_recogida_nueva.id_contenedor != '') {
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
      this.router.navigate(['dashboard']);
    } else {
      console.log('no hay nada que recoger');
    }
  }

  cambiarContenedorVisitado(estado: boolean) {
    this.cont_recogida_nueva.visitado = estado;
  }

  cambiarContenedorRecogido(estado: boolean) {
    this.cont_recogida_nueva.recogida = estado;
  }

  // MÉTODOS PARA EESS
  buscarEESS() {}
  seleccionarEESS(eess: any) {}
  insertarEESS() {}
  cambiarEESSVisitado(estado: boolean) {}
  cambiarEESSRecogido(estado: boolean) {}

  //MÉTODOS PARA TODOS
  //DEBUG
  imprimirCosas() {
    console.log(this.recogida_nueva);
    console.log(this.cont_recogida_nueva);
  }

  //este método es para que el boton de "HORECA" "RESPOL", "CONTENEDOR" se quede marcado y mostrar el formulario correspondiente
  seleccionarTipo(tipo: any) {
    this.active = tipo;
  }

  limpiarFormulario() {
      //datos de horeca
      this.recogida_nueva.id_contenedor = '',
      this.recogida_nueva.fecha = '',
      this.recogida_nueva.id_ruta = '',
      this.recogida_nueva.litros_recogidos = 0,
      this.recogida_nueva.visitado = true,
      this.recogida_nueva.recogida = true,
      this.recogida_nueva.bidones_recogidos = 0,
      this.recogida_nueva.bidones_entregados = 0,
      this.recogida_nueva.notas = '',
      //datos del producto de Horeca
      this.recogida_nueva.desengrasante = 0,
      this.recogida_nueva.fregasuelo = 0,
      this.recogida_nueva.lavavajilla = 0,
      this.recogida_nueva.jabon_manos = 0,
      this.recogida_nueva.higienizante = 0,
      this.recogida_nueva.wc_banos = 0,
      this.recogida_nueva.limpia_cristales = 0,
      this.recogida_nueva.lejia = 0,
      this.recogida_nueva.bayeta = 0,
      this.recogida_nueva.filtros = 0,
      this.recogida_nueva.dinero = 0,
      //datos del cliente de Horeca
      this.recogida_nueva.nombre = '',
      this.recogida_nueva.cif = '',
      this.recogida_nueva.telefono = '',
      this.recogida_nueva.direccion = '',
      this.recogida_nueva.municipio = '',
      this.recogida_nueva.cod_postal = '',
      this.recogida_nueva.provincia = '',
      this.recogida_nueva.pais = '',

      //datos del contenedor
      //datos del "cliente"
      this.cont_recogida_nueva.nombre = '',
      this.cont_recogida_nueva.cif = '',
      this.cont_recogida_nueva.telefono = '',
      this.cont_recogida_nueva.direccion = '',
      this.cont_recogida_nueva.municipio = '',
      this.cont_recogida_nueva.cod_postal = '',
      this.cont_recogida_nueva.provincia = '',
      this.cont_recogida_nueva.pais = '',
      //Datos del formulario de contenedor
      this.cont_recogida_nueva.id_contenedor = '',
      this.cont_recogida_nueva.fecha = '',
      this.cont_recogida_nueva.id_ruta = '',
      this.cont_recogida_nueva.litros_recogidos = 0,
      this.cont_recogida_nueva.visitado = true,
      this.cont_recogida_nueva.recogida = true,
      this.cont_recogida_nueva.bidones_recogidos = null,
      this.cont_recogida_nueva.bidones_entregados = null,
      this.cont_recogida_nueva.notas = ''

      //datos de EESS
      //datos del cliente
    }
}
