import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SesionComponent } from './componentes/sesion/sesion.component';
import { RegistrarUsuarioComponent } from './componentes/registrar-usuario/registrar-usuario.component';
import { VerificarCorreoComponent } from './componentes/verificar-correo/verificar-correo.component';
import { RecuperarPasswordComponent } from './componentes/recuperar-password/recuperar-password.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { ListClienteComponent } from './contenido/cliente/lista-cliente/list-cliente/list-cliente.component';
import { ClienteComponent } from './contenido/cliente/cliente.component';
import { ServicioComponent } from './contenido/servicio/servicio.component';
import { ListServicioComponent } from './contenido/servicio/list-servicio/list-servicio.component';
import { FacturarComponent } from './contenido/facturar/facturar.component';
import { DetFacturaComponent } from './contenido/facturar/det-factura/det-factura.component';

const routes: Routes = [
  { path: '', redirectTo: 'sesion', pathMatch: 'full' },
  { path: 'sesion', component: SesionComponent },
  { path: 'registrar-usuario', component: RegistrarUsuarioComponent },
  { path: 'verificar-correo', component: VerificarCorreoComponent },
  { path: 'recuperar-password', component: RecuperarPasswordComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'list-cliente', component: ListClienteComponent },
  { path: 'editCliente/:id', component: ClienteComponent},
  { path: 'servicio', component: ServicioComponent },
  { path: 'list-servicio', component: ListServicioComponent },
  { path: 'editServicio/:id', component: ServicioComponent},
  { path: 'factura', component: FacturarComponent },
  { path: 'det-factura', component: DetFacturaComponent },
  { path: 'editFactura/:id', component: FacturarComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: 'sesion', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
