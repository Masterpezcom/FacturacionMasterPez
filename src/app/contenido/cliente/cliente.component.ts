import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/compat';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/Servicios/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {
  createCliente: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Agregar Cliente';

  constructor(private fb: FormBuilder,
              private _clienteService: ClienteService,
              private router: Router,
              private toastr: ToastrService,
              private aRoute: ActivatedRoute) {
    this.createCliente = this.fb.group({
      identificacion: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['', Validators.required],
      telefono: ['', Validators.required],
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }

  ngOnInit(): void {
  /* this.esEditar();*/

  }

  agregarCliente(){
    this.submitted = true;
    if(this.createCliente.invalid) {
      return;
    }
    const cliente: any = {
      identificacion: this.createCliente.value.identificacion,
      nombre: this.createCliente.value.nombre,
      direccion: this.createCliente.value.direccion,
      correo: this.createCliente.value.correo,
      telefono: this.createCliente.value.telefono,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    }
    this.loading = true;
    this._clienteService.agregarCliente(cliente).then(() =>{
      this.toastr.success('El Cliente fue Regitrado con Exito!', 'Cliente Registrado', {
        positionClass: 'toast-botton-right'
      });
      this.loading = false;
      this.router.navigate(['/list-cliente'])
    }).catch(error =>{
      console.log(error);
      this.loading = false;
    })
  }

 /* esEditar() {
    this.titulo = 'Editar Cliente'
    if(this.id !== null) {
      this._clienteService.getCliente(this.id).subscribe(data => {
        console.log(data.payload.data()['nombre']);
        this.createCliente.setValue({
          identificacion: data.payload.data()['identificacion'],
          nombre: data.payload.data()['nombre'],
          direccion: data.payload.data()['direccion'],
          correo: data.payload.data()['correo'],
          telefono: data.payload.data()['telefono'],
        })
      })
    }
  }*/

}
