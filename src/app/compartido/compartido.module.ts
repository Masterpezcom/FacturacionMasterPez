import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { PieComponent } from './pie/pie.component';



@NgModule({
  declarations: [
    CabeceraComponent,
    PieComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CabeceraComponent,
    PieComponent
  ]
})
export class CompartidoModule { }
