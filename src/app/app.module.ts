
//Modulos
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { CompartidoModule } from './compartido/compartido.module';
import { ContenidoModule } from './contenido/contenido.module';
import { ConfiguracionesModule } from './configuraciones/configuraciones.module';
import { InicioModule } from './inicio/inicio.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';


//Componentes
import { AppComponent } from './app.component';
import { SesionComponent } from './componentes/sesion/sesion.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { RegistrarUsuarioComponent } from './componentes/registrar-usuario/registrar-usuario.component';
import { VerificarCorreoComponent } from './componentes/verificar-correo/verificar-correo.component';
import { RecuperarPasswordComponent } from './componentes/recuperar-password/recuperar-password.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment.development';
import { getAuth, provideAuth } from '@angular/fire/auth';





@NgModule({
  declarations: [
    AppComponent,
    SesionComponent,
    DashboardComponent,
    RegistrarUsuarioComponent,
    VerificarCorreoComponent,
    RecuperarPasswordComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    CompartidoModule,
    ContenidoModule,
    ConfiguracionesModule,
    InicioModule,
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp({"projectId":"facturacion-masterpez","appId":"1:397546281386:web:addf8364996fdced8e33d3","storageBucket":"facturacion-masterpez.appspot.com","apiKey":"AIzaSyDdtEuVGSY8Gdkz3X736GBhEvI5HQlVdgE","authDomain":"facturacion-masterpez.firebaseapp.com","messagingSenderId":"397546281386","measurementId":"G-0MHZFJKR2E"})),
    provideAuth(() => getAuth())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
