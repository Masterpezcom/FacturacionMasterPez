import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ClienteService } from 'src/app/Servicios/cliente.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.css']
})
export class ListClienteComponent implements OnInit {
  firestore: Firestore = inject(Firestore)
  clientes: any[] = [];


  constructor(private _clienteService: ClienteService,
    private _deleclienteService: ClienteService,
    private _modclienteService: ClienteService,
    private toastr: ToastrService) {


  }

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

 /* async eliminarCliente(cliente: any) {
    const response = await this._clienteService.eliminarCliente(cliente);
    console.log(response);
  }*/
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

  }

