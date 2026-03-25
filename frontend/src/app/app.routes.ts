import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component/dashboard.component';
import { Error404Component } from './components/error404.component/error404.component';
import { ClienteComponent } from './components/cliente.component/cliente.component';

export const routes: Routes = [

    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent, title: 'Dashboard'},
    {path: '**', component: Error404Component, title: 'Error 404'},
    {path: 'cliente', component: ClienteComponent, title: 'Cliente'}

];
