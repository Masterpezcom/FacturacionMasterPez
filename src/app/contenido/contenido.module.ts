import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturarComponent } from './facturar/facturar.component';
import { RevisarComponent } from './revisar/revisar.component';
import { ServicioComponent } from './servicio/servicio.component';
import { ClienteComponent } from './cliente/cliente.component';
import { CierreComponent } from './cierre/cierre.component';



@NgModule({
  declarations: [
    FacturarComponent,
    RevisarComponent,
    ServicioComponent,
    ClienteComponent,
    CierreComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FacturarComponent,
    RevisarComponent,
    ServicioComponent,
    ClienteComponent,
    CierreComponent
  ]
})
export class ContenidoModule { }
