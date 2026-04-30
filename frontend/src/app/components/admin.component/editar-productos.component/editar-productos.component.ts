import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';


@Component({
  selector: 'app-editar-productos.component',
  imports: [],
  templateUrl: './editar-productos.component.html',
  styleUrl: './editar-productos.component.css',
})
export class EditarProductosComponent implements OnInit {

  productos: any[] = [];

  constructor(
   private adminService: AdminService,
  ) { }

  ngOnInit(): void {

    this.cargarProductos(); 

  }

  cargarProductos(){
    this.adminService
        .traerProductos()
        .subscribe((resultado: any) => {
          this.productos = resultado;
    });
  }
}
