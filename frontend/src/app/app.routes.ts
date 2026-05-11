//Importamos la herramienta Routes y la herramienta propia roleGuard, para limitar que rol entra a cada componente
import { Routes } from '@angular/router';
import { roleGuard } from './guards/auth.guard';

//Importamos los componentes de nuestra aplicación
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
import { EditarUsuariosComponent } from './components/admin.component/editar-usuarios.component/editar-usuarios.component';
import { EditarContenedoresComponent } from './components/admin.component/editar-contenedores.component/editar-contenedores.component';
// import { LoginComponent } from './components/login.component/login.component';


//A continuación, comentado, están las rutas sin roleGuard.
// export const routes: Routes = [

//     {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
//     {path: 'dashboard', component: DashboardComponent, title: 'Dashboard'},
//     {path: 'rutas', component: RutasComponent, title: 'Rutas'},
//     {path: 'cliente/:id_cliente', component: ClienteComponent, title: 'Cliente'},
//     {path: 'nuevoCliente', component: NuevoClienteComponent, title: 'Nuevo Cliente'},
//     {path: 'recogidas', component: RecogidasComponent, title: 'Recogidas'},
//     {path: 'modificar/:id_cliente', component: ModificarComponent, title: 'Modificar'},
//     {path: 'confirmado/:id_cliente', component: CambioConfirmadoComponent, title: 'Confirmado'},
//     // {path: 'confirmado', component: CambioConfirmadoComponent, title: 'confirmado'},
//     {path: 'admin', component: AdminComponent, title: 'Admin'},
//     {path: 'admin/editarProductos', component: EditarProductosComponent, title: 'Editar Productos'},
//     {path: 'admin/conductores', component: ConductoresComponent, title: 'Conductores'},
//     {path: 'admin/vehiculos', component: VehiculosComponent, title: 'Vehiculos'},
//     {path: 'admin/editarUsuarios', component: EditarUsuariosComponent, title: 'Usuarios'},
//     {path: 'admin/editarContenedores', component: EditarContenedoresComponent, title: 'Contenedores'},
//     {path: 'ultimasRecogidas', component: UltimasRecogidasComponent, title: 'Ultimas Recogidas'},
//     {path: 'ultimasRutas', component: UltimasRutasComponent, title: 'Ultimas Rutas'},
//     {path: 'estadisticas', component: EstadisticasComponent, title: 'Estadisticas'},
//     // {path: 'login', component: LoginComponent, title: 'Login'},
//     {path: 'error', component:Error404Component, title: 'Error 404'},
//     {path: '**', component: Error404Component, title: 'Error 404'}, //IMPORTANTE - SIEMPRE LA ULTIMA
// ];

export const routes: Routes = [

    { path: '', redirectTo: '/ultimasRutas', pathMatch: 'full' },

    {
        path: 'ultimasRutas',
        component: UltimasRutasComponent,
        title: 'Ultimas Rutas',
        canActivate: [roleGuard(['admin', 'user', 'conductor'])]
    },

    {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard',
        canActivate: [roleGuard(['admin', 'user'])]
    },

    {
        path: 'rutas',
        component: RutasComponent,
        title: 'Rutas',
        canActivate: [roleGuard(['admin', 'user', 'conductor'])]
    },

    {
        path: 'cliente/:id_cliente',
        component: ClienteComponent,
        title: 'Cliente',
        canActivate: [roleGuard(['admin', 'user', 'conductor'])]
    },

    {
        path: 'nuevoCliente',
        component: NuevoClienteComponent,
        title: 'Nuevo Cliente',
        canActivate: [roleGuard(['admin'])]
    },

    {
        path: 'recogidas',
        component: RecogidasComponent,
        title: 'Recogidas',
        canActivate: [roleGuard(['admin', 'user', 'conductor'])]
    },

    {
        path: 'modificar/:id_cliente',
        component: ModificarComponent,
        title: 'Modificar',
        canActivate: [roleGuard(['admin'])]
    },

    {
        path: 'confirmado/:id_cliente',
        component: CambioConfirmadoComponent,
        title: 'Confirmado',
        canActivate: [roleGuard(['admin', 'user', 'conductor'])]
    },

    // {path: 'confirmado', component: CambioConfirmadoComponent, title: 'confirmado', canActivate: [roleGuard(['admin', 'user', 'conductor'])]},

    {
        path: 'admin',
        component: AdminComponent,
        title: 'Admin',
        canActivate: [roleGuard(['admin'])]
    },

    {
        path: 'admin/editarProductos',
        component: EditarProductosComponent,
        title: 'Editar Productos',
        canActivate: [roleGuard(['admin'])]
    },

    {
        path: 'admin/conductores',
        component: ConductoresComponent,
        title: 'Conductores',
        canActivate: [roleGuard(['admin'])]
    },

    {
        path: 'admin/vehiculos',
        component: VehiculosComponent,
        title: 'Vehiculos',
        canActivate: [roleGuard(['admin'])]
    },

    {
        path: 'admin/editarUsuarios',
        component: EditarUsuariosComponent,
        title: 'Usuarios',
        canActivate: [roleGuard(['admin'])]
    },

    {
        path: 'admin/editarContenedores',
        component: EditarContenedoresComponent,
        title: 'Contenedores',
        canActivate: [roleGuard(['admin'])]
    },

    {
        path: 'ultimasRecogidas',
        component: UltimasRecogidasComponent,
        title: 'Ultimas Recogidas',
        canActivate: [roleGuard(['admin', 'user'])]
    },

    {
        path: 'estadisticas',
        component: EstadisticasComponent,
        title: 'Estadisticas',
        canActivate: [roleGuard(['admin', 'user', 'conductor'])]
    },

    // {path: 'login', component: LoginComponent, title: 'Login', canActivate: [roleGuard(['admin', 'user', 'conductor'])]},

    {
        path: 'error',
        component: Error404Component,
        title: 'Error 404',
        canActivate: [roleGuard(['admin', 'user', 'conductor'])]
    },

    {
        path: '**',
        component: Error404Component,
        title: 'Error 404',
        canActivate: [roleGuard(['admin', 'user', 'conductor'])]
    }, //IMPORTANTE - SIEMPRE LA ULTIMA
];
