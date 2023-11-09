import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { servicioService } from 'src/app/Servicios/servicio.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-servicio',
  templateUrl: './list-servicio.component.html',
  styleUrls: ['./list-servicio.component.css']
})
export class ListServicioComponent implements OnInit {
  firestore: Firestore = inject(Firestore)
  servicios: any[] = [];


  constructor(private _servicioService: servicioService,
    private _deleservicioService: servicioService,
    private _modservicioService: servicioService,
    private toastr: ToastrService) {


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

 /* async eliminarCliente(cliente: any) {
    const response = await this._clienteService.eliminarCliente(cliente);
    console.log(response);
  }*/
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

  }
