import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { servicioService } from 'src/app/Servicios/servicio.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-servicio',
  templateUrl: './list-servicio.component.html',
  styleUrls: ['./list-servicio.component.css']
})
export class ListServicioComponent implements OnInit {
  firestore: Firestore = inject(Firestore)
  servicios: any[] = [];
  servicioEditar: any = {
    codigo: '',
    nombreSer: '',
    descripcion: '',
    precio: '',
  };

  servicioEditarForm: FormGroup;


  constructor(private _servicioService: servicioService,
    private _deleservicioService: servicioService,
    private _modservicioService: servicioService,
    private toastr: ToastrService,
    private fb: FormBuilder) {
      this.servicioEditarForm = this.fb.group({
        codigo: [''],
        nombreSer: [''],
        descripcion: [''],
        precio: [''],
      });
    }

    ngOnInit(): void {
      this._servicioService.getServicio().subscribe(servicios => {
        this.servicios = servicios;
      })
    }

  getServicio() {
    this._servicioService.getServicio().subscribe(data => {
      this.servicios = [];
      data.forEach((element:any) => {
        this.servicios.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })

      })
    });
    console.log(this.servicios);
  }


  async eliminarServicio(servicio: any) {
    await this._deleservicioService.eliminarServicio(servicio).then(( ) => {
      console.log('Servicio Eliminado con Exito!');
      this.toastr.error('El Servicio fue Eliminado con Exito!', 'Servicio Eliminado', {
        positionClass: 'toastr-bottom-right'
      });
    }).catch(error => {
      console.log(error);
    })

  }

  async editarServicio(servicio: any) {
    console.log(servicio);
    this.servicioEditar = servicio;

    // Asignando los datos al formulario
    this.servicioEditarForm.setValue({
      codigo: servicio.codigo,
      nombreSer: servicio.nombreSer,
      descripcion: servicio.descripcion,
      precio: servicio.precio

    });
  }

  editarFormc() {
    // Obteniendo los valores del formulario
    const nuevosDatos = this.servicioEditarForm.value;

    // Llamando al servicio para editar el cliente
    this._servicioService.editarS(this.servicioEditar.id, nuevosDatos)
      .then(() => {
        console.log('Cliente Editado con Éxito!');
        this.toastr.success('El Cliente fue Editado con Éxito!', 'Edición Exitosa', {
          positionClass: 'toastr-bottom-right'
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
}
