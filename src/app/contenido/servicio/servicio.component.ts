import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/compat';
import { ToastrService } from 'ngx-toastr';
import { servicioService } from 'src/app/Servicios/servicio.service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent {
  createServicio: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Agregar Servicio';

  constructor(private fb: FormBuilder,
              private _servicioService: servicioService,
              private router: Router,
              private toastr: ToastrService,
              private aRoute: ActivatedRoute) {
    this.createServicio = this.fb.group({
      codigo: ['', Validators.required],
      nombreSer: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }

  ngOnInit(): void {


  }

  agregarServicio(){
    this.submitted = true;
    if(this.createServicio.invalid) {
      return;
    }
    const servicio: any = {
      codigo: this.createServicio.value.codigo,
      nombreSer: this.createServicio.value.nombreSer,
      descripcion: this.createServicio.value.descripcion,
      precio: this.createServicio.value.precio,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    }
    this.loading = true;
    this._servicioService.agregarServicio(servicio).then(() =>{
      this.toastr.success('El Servicio fue Regitrado con Exito!', 'Servicio Registrado', {
        positionClass: 'toast-botton-right'
      });
      this.loading = false;
      this.router.navigate(['/list-servicio'])
    }).catch(error =>{
      console.log(error);
      this.loading = false;
    })
  }



}
