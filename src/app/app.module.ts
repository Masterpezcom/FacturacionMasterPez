import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompartidoModule } from './compartido/compartido.module';
import { ContenidoModule } from './contenido/contenido.module';
import { ConfiguracionesModule } from './configuraciones/configuraciones.module';
import { InicioModule } from './inicio/inicio.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CompartidoModule,
    ContenidoModule,
    ConfiguracionesModule,
    InicioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
