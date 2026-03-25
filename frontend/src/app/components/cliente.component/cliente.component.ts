import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente.component',
  imports: [],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css',
})
export class ClienteComponent {

    constructor(
    private router: Router
  ){}

}
