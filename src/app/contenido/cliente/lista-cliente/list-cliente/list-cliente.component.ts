import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ClienteService } from 'src/app/Servicios/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.css']
})
export class ListClienteComponent implements OnInit {
  firestore: Firestore = inject(Firestore)
  clientes: any[] = [];

clienteEditar: any = {
  identificacion: '',
  nombre: '',
  direccion: '',
  correo: '',
  telefono: '',
};

clienteEditarForm: FormGroup;


constructor(private _clienteService: ClienteService, private _deleclienteService: ClienteService,
  private _modclienteService: ClienteService, private toastr: ToastrService,
  private fb: FormBuilder) {
    this.clienteEditarForm = this.fb.group({
      identificacion: [''],
      nombre: [''],
      direccion: [''],
      correo: [''],
      telefono: ['']
    });
    };


  ngOnInit(): void {
    this._clienteService.getClientes().subscribe(clientes => {
      this.clientes = clientes;
    })
  }

  getClientes() {
    this._clienteService.getClientes().subscribe(data => {
      this.clientes = [];
      data.forEach((element:any) => {
        this.clientes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })

      })
    });
    console.log(this.clientes);
  }


  async eliminarCliente(cliente: any) {
    await this._deleclienteService.eliminarCliente(cliente).then(( ) => {
      console.log('Cliente Eliminado con Exito!');
      this.toastr.error('El Cliente fue Eliminado con Exito!', 'Registro Eliminado', {
        positionClass: 'toastr-bottom-right'
      });
    }).catch(error => {
      console.log(error);
    })

  }

async editarCliente(cliente: any) {
  console.log(cliente);
  this.clienteEditar = cliente;

  // Asignando los datos al formulario
  this.clienteEditarForm.setValue({
    identificacion: cliente.identificacion,
    nombre: cliente.nombre,
    direccion: cliente.direccion,
    correo: cliente.correo,
    telefono: cliente.telefono
  });
}

editarFormc() {
  // Obteniendo los valores del formulario
  const nuevosDatos = this.clienteEditarForm.value;

  // Llamando al servicio para editar el cliente
  this._clienteService.editarC(this.clienteEditar.id, nuevosDatos)
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
