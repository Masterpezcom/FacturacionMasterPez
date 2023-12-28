import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FacturaService } from 'src/app/Servicios/factura.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-det-factura',
  templateUrl: './det-factura.component.html',
  styleUrls: ['./det-factura.component.css']
})
export class DetFacturaComponent implements OnInit {
  firestore: Firestore = inject(Firestore)
  facturas: any[] = [];
  clientes: any[] = []; // Almacenará la lista de clientes obtenida de Firebase
  servicios: any[] = []; // Almacenará la lista de servicios obtenida de Firebase
  facturaSeleccionada: any = {}; // Almacenará la factura actualmente seleccionada
  serviciosSeleccionados: any[] = []; // Almacenará los servicios seleccionados para la factura actual
  nuevaFactura: any = { descuento: 0 }; // Para almacenar la nueva factura a agregar
  nuevoServicio: any = {}; // Para almacenar el nuevo servicio a agregar
  submitted = false;
  loading = false;
  router: any;
  facturaEditar: any = {
    cliente: '',
    servicio: '',
    cantidad: '',
    descuento: '',
  };



facturaEditarForm: FormGroup;


constructor(private _facturaService: FacturaService, private _delefacturaService: FacturaService,
  private _modfacturaService: FacturaService, private toastr: ToastrService,
  private fb: FormBuilder) {
    this.facturaEditarForm = this.fb.group({
      cliente: [''],
      servicio: [''],
      cantidad: [''],
      descuento: ['']
    });
    };


  ngOnInit(): void {
    this._facturaService.getFacturas().subscribe(facturas => {
      this.facturas = facturas;
    })
  }

  getFacturas() {
    this._facturaService.getFacturas().subscribe(data => {
      this.facturas = [];
      data.forEach((element:any) => {
        this.facturas.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })

      })
    });
    console.log(this.facturas);
  }


  async eliminarFactura(factura: any) {
    await this._delefacturaService.eliminarFactura(factura).then(( ) => {
      console.log('Factura Eliminada con Exito!');
      this.toastr.error('La Factura fue Eliminada con Exito!', 'Registro Eliminado', {
        positionClass: 'toastr-bottom-right'
      });
    }).catch(error => {
      console.log(error);
    })

  }

async editarFactura(factura: any) {
  console.log(factura);
  this.facturaEditar = factura;

  // Asignando los datos al formulario
  this.facturaEditarForm.setValue({
    cliente: factura.cliente,
    sericio: factura.servicio,
    cantidad: factura.cantidad,
    descuento: factura.descuento
  });
}

editarFormf() {
  // Obteniendo los valores del formulario
  const nuevosDatos = this.facturaEditarForm.value;

  // Llamando al servicio para editar la factura
  this._facturaService.editarFactura(this.facturaEditar.id, nuevosDatos)
    .then(() => {
      console.log('Factura Editada con Éxito!');
      this.toastr.success('La factura fue Editada con Éxito!', 'Edición Exitosa', {
        positionClass: 'toastr-bottom-right'
      });
    })
    .catch(error => {
      console.log(error);
    });
}

agregarServicio() {
  // Agregar un servicio a la lista de servicios seleccionados para la factura actual
  if (this.nuevoServicio && !this.serviciosSeleccionados.includes(this.nuevoServicio)) {
    this.serviciosSeleccionados.push(this.nuevoServicio);
  }
  // Calcular el total de la factura después de agregar el servicio
  this.nuevaFactura.total = this.calcularTotalFactura(this.nuevaFactura);
}

  quitarServicio(factura: any, servicio: any) {
  // Quitar un servicio de la lista de servicios seleccionados para la factura actual
  const index = this.serviciosSeleccionados.indexOf(servicio);
  if (index !== -1) {
    this.serviciosSeleccionados.splice(index, 1);
  }
  this.nuevaFactura.total = this.calcularTotalFactura(this.nuevaFactura);
}


calcularTotalFactura(factura: any): number {
  let total = 0;

  // Utilizar 'factura.servicios' si está definido, de lo contrario, usar 'factura.nuevaFactura.servicios'
  const servicios = factura.servicios || this.nuevaFactura.servicios;

  // Sumar los totales de cada servicio en la factura
  for (const servicio of servicios) {
    total += servicio.total;
  }

  // Aplicar el descuento
  total -= (total * factura.descuento) / 100;

  return total;
}
}
