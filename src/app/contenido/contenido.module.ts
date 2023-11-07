import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturarComponent } from './facturar/facturar.component';
import { RevisarComponent } from './revisar/revisar.component';
import { ServicioComponent } from './servicio/servicio.component';
import { ClienteComponent } from './cliente/cliente.component';
import { CierreComponent } from './cierre/cierre.component';
import { ListClienteComponent } from './cliente/lista-cliente/list-cliente/list-cliente.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    FacturarComponent,
    RevisarComponent,
    ServicioComponent,
    ClienteComponent,
    CierreComponent,
    ListClienteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports:[
    FacturarComponent,
    RevisarComponent,
    ServicioComponent,
    ClienteComponent,
    CierreComponent,
    ListClienteComponent
  ]
})
export class ContenidoModule { }
