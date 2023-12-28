import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/compat';
import { ToastrService } from 'ngx-toastr';
import { FacturaService } from 'src/app/Servicios/factura.service';
import { ClienteService } from 'src/app/Servicios/cliente.service';


@Component({
  selector: 'app-facturar',
  templateUrl: './facturar.component.html',
  styleUrls: ['./facturar.component.css']
})
export class FacturarComponent implements OnInit {
  createFactura: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Facturar';
  facturas: any[] = []; // Aquí almacenaremos las facturas obtenidas de Firebase
  clientes: any[] = []; // Almacenará la lista de clientes obtenida de Firebase
  servicios: any[] = []; // Almacenará la lista de servicios obtenida de Firebase
  facturaSeleccionada: any = {}; // Almacenará la factura actualmente seleccionada
  serviciosSeleccionados: any[] = []; // Almacenará los servicios seleccionados para la factura actual
  nuevaFactura: any = { descuento: 0 }; // Para almacenar la nueva factura a agregar
  nuevoServicio: any = {}; // Para almacenar el nuevo servicio a agregar


  constructor(private fb: FormBuilder,
              private _facturaService: FacturaService,
              private router: Router,
              private toastr: ToastrService,
              private aRoute: ActivatedRoute) {
                this.createFactura = this.fb.group({
                  cliente: ['', Validators.required],
                  servicio: ['', Validators.required],
                  precio: ['', Validators.required],
                  cantidad: ['', Validators.required],
                  descuento: ['', Validators.required],
                  total: ['', Validators.required],
                })
                this.id = this.aRoute.snapshot.paramMap.get('id');
                console.log(this.id)
              }

  ngOnInit() {
    // Cuando se inicializa el componente, obtenemos las facturas, clientes y servicios
    this.obtenerFacturas();
    this.obtenerClientes();
    this.obtenerServicios();
  }

  obtenerFacturas() {
    // Obtener las facturas de Firebase
    this._facturaService.getFacturas().subscribe((data) => {
      this.facturas = data;
    });
  }

  obtenerClientes() {
    // Obtener la lista de clientes de Firebase
    this._facturaService.getClientes().subscribe((data) => {
      this.clientes = data;
    });
  }

  obtenerServicios() {
    // Obtener la lista de servicios de Firebase
    this._facturaService.getServicio().subscribe((data) => {
      this.servicios = data;
    });
  }


  agregarFactura() {
    // Agregar una nueva factura a Firebase y actualizar la lista
    this._facturaService.agregarFactura(this.nuevaFactura).then(() => {
      this.obtenerFacturas();
      this.nuevaFactura = {}; // Limpiar el formulario después de agregar
      this.router.navigate(['/det-factura']);
    });

    // Calcular el total de la factura después de agregar la factura
    const [nombreServicio, precio] = this.nuevaFactura.servicio.split('|');
    this.nuevaFactura.total = this.calcularTotalFactura(this.nuevaFactura);
    console.log('Nombre del servicio:', nombreServicio);
    console.log('Precio:', precio);
    // Realiza otras acciones necesarias

  }

/*
  agregarFactura() {
    this.submitted = true;
    if (this.createFactura.invalid) {
      return;
    }
    const factura: any = {
      identificacion: this.createFactura.value.cliente,
      nombre: this.createFactura.value.servicio,
      direccion: this.createFactura.value.cantidad,
      correo: this.createFactura.value.descuento,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    }
    this.loading = true;
    this._facturaService.agregarFactura(factura).then(() =>{
      this.toastr.success('La factura fue Regitrada con Exito!', 'Factura Registrada', {
        positionClass: 'toast-botton-right'
      });
            // Calcular el total de la factura después de agregar la factura
            this.nuevaFactura.total = this.calcularTotalFactura(this.nuevaFactura);
      this.loading = false;
      this.router.navigate(['/det-factura'])
    }).catch(error =>{
      console.log(error);
      this.loading = false;
    })
  }
*/



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

