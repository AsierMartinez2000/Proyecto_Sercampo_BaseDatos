import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component/dashboard.component';
import { Error404Component } from './components/error404.component/error404.component';
import { ClienteComponent } from './components/cliente.component/cliente.component';
import { NuevoClienteComponent } from './components/nuevo-cliente.component/nuevo-cliente.component';
import { RecogidasComponent } from './components/recogidas.component/recogidas.component';
import { ModificarComponent } from './components/modificar.component/modificar.component';
import { CambioConfirmadoComponent } from './components/cambio-confirmado.component/cambio-confirmado.component';
import { RutasComponent } from './components/rutas.component/rutas.component';
import { AdminComponent } from './components/admin.component/admin.component';
import { EditarProductosComponent } from './components/admin.component/editar-productos.component/editar-productos.component';
import { ConductoresComponent } from './components/admin.component/conductores.component/conductores.component';
import { VehiculosComponent } from './components/admin.component/vehiculos.component/vehiculos.component';
import { EstadisticasComponent } from './components/estadisticas.component/estadisticas.component';
import { UltimasRecogidasComponent } from './components/ultimas-recogidas.component/ultimas-recogidas.component';
import { UltimasRutasComponent } from './components/ultimas-rutas.component/ultimas-rutas.component';

export const routes: Routes = [

    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent, title: 'Dashboard'},
    {path: 'rutas', component: RutasComponent, title: 'Rutas'},
    {path: 'cliente/:id_cliente', component: ClienteComponent, title: 'Cliente'},
    {path: 'nuevoCliente', component: NuevoClienteComponent, title: 'Nuevo Cliente'},
    {path: 'recogidas', component: RecogidasComponent, title: 'Recogidas'},
    {path: 'modificar/:id_cliente', component: ModificarComponent, title: 'Modificar'},
    {path: 'confirmado/:id_cliente', component: CambioConfirmadoComponent, title: 'Confirmado'},
    // {path: 'confirmado', component: CambioConfirmadoComponent, title: 'confirmado'},
    {path: 'admin', component: AdminComponent, title: 'Admin'},
    {path: 'admin/editarProducto', component: EditarProductosComponent, title: 'Editar Producto'},
    {path: 'admin/conductores', component: ConductoresComponent, title: 'Conductores'},
    {path: 'admin/vehiculos', component: VehiculosComponent, title: 'Vehiculos'},
    {path: 'ultimasRecogidas', component: UltimasRecogidasComponent, title: 'Ultimas Recogidas'},
    {path: 'ultimasRutas', component: UltimasRutasComponent, title: 'Ultimas Rutas'},
    {path: 'estadisticas', component: EstadisticasComponent, title: 'Estadisticas'},
    {path: 'error', component:Error404Component, title: 'Error 404'},
    {path: '**', component: Error404Component, title: 'Error 404'}, //IMPORTANTE - SIEMPRE LA ULTIMA
];
