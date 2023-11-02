import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './usuario/usuario.component';



@NgModule({
  declarations: [
    UsuarioComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UsuarioComponent
  ]
})
export class ConfiguracionesModule { }
