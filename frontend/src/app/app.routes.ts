import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component/dashboard.component';
import { Error404Component } from './components/error404.component/error404.component';
import { ClienteComponent } from './components/cliente.component/cliente.component';
import { NuevoClienteComponent } from './components/nuevo-cliente.component/nuevo-cliente.component';
import { RecogidasComponent } from './components/recogidas.component/recogidas.component';
import { ModificarComponent } from './components/modificar.component/modificar.component';

export const routes: Routes = [

    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent, title: 'Dashboard'},
    {path: 'cliente/:id_cliente', component: ClienteComponent, title: 'Cliente'},
    {path: 'nuevoCliente', component: NuevoClienteComponent, title: 'nuevoCliente'},
    {path: 'recogidas', component: RecogidasComponent, title: 'recogidas'},
    {path: 'modificar/:id_cliente', component: ModificarComponent, title: 'modificar'},
    {path: 'error', component:Error404Component, title: 'Error 404'},
    {path: '**', component: Error404Component, title: 'Error 404'}, //IMPORTANTE - SIEMPRE LA ULTIMA
];
