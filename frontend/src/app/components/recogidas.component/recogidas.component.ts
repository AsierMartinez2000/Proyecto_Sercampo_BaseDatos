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
export class RecogidasComponent {}
