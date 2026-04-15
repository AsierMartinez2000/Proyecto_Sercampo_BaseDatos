import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recogidas.component',
  imports: [FormsModule, CommonModule],
  templateUrl: './recogidas.component.html',
  styleUrl: './recogidas.component.css',
})
export class RecogidasComponent {

  active = "horeca";

  //este método es para que el boton de "HORECA" "RESPOL", "CONTENEDOR" se quede marcado y mostrar el formulario correspondiente
  seleccionarTipo(tipo: any) {
    this.active = tipo;
    
    

  }


}
