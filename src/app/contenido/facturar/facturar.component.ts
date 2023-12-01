import { Component } from '@angular/core';
import { ClienteService } from 'src/app/Servicios/cliente.service';
import { servicioService } from 'src/app/Servicios/servicio.service';
import { FacturaService } from 'src/app/Servicios/factura.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-facturar',
  templateUrl: './facturar.component.html',
  styleUrls: ['./facturar.component.css']
})
export class FacturarComponent {

  clientes: any[] = [];
  servicios: any[] = [];
  clienteSeleccionado: any;
  serviciosSeleccionados: any[] = [];
  descuentos: number[] = [0, 5, 15, 30];
  descuentoSeleccionado: number = 0;
  totalFactura: number = 0;
  factura: any = {};

  constructor(private clienteService: ClienteService, private servicioService: servicioService,
              private facturaService: FacturaService) {
    // Obtener lista de clientes al inicializar el componente
    this.clienteService.getClientes().subscribe(clientes => {
      this.clientes = clientes;
      this.factura = {};
    });

    // Obtener lista de servicios al inicializar el componente
    this.servicioService.getServicio().subscribe(servicios => {
      this.servicios = servicios;
    });

    this.serviciosSeleccionados = [];
  }

  agregarServicio(servicio: any) {
    // Verificar si el servicio ya está en la lista
    if (!this.serviciosSeleccionados.some(s => s.id === servicio.id)) {
      this.serviciosSeleccionados.push({ ...servicio, cantidad: 1 });
      this.actualizarTotales();
      console.log('Servicio agregado:', servicio);
    }
  }

  actualizarTotales() {
    // Calcula el subtotal antes de aplicar el descuento
    const subtotal = this.serviciosSeleccionados.reduce((acc, servicio) => {
      return acc + servicio.precio * servicio.cantidad;
    }, 0);

    // Aplica el descuento seleccionado
    const descuento = subtotal * (this.descuentoSeleccionado / 100);

    // Calcula el total de la factura
    this.totalFactura = subtotal - descuento;
  }

  eliminarServicio(servicio: any) {
    // Elimina el servicio de la lista
    this.serviciosSeleccionados = this.serviciosSeleccionados.filter(s => s.id !== servicio.id);
    this.actualizarTotales();
  }

  facturar() {
    // Verifica si hay servicios seleccionados
    if (this.serviciosSeleccionados.length === 0) {
      // Muestra un mensaje de error o toma la acción que consideres adecuada
      console.error('No hay servicios seleccionados para facturar.');
      return;
    }

    // Crea un objeto de factura con los detalles necesarios
    const factura = {
      cliente: this.clienteSeleccionado,
      servicios: this.serviciosSeleccionados,
      descuento: this.descuentoSeleccionado,
      total: this.totalFactura
    };

    // Llama al servicio para guardar la factura
    this.facturaService.guardarFactura(factura).then(() => {
      // Maneja el éxito aquí
      console.log('Factura guardada con éxito!');

      // Reinicia las variables o realiza cualquier otra acción necesaria
      this.serviciosSeleccionados = [];
      this.descuentoSeleccionado = 0;
      this.actualizarTotales();

      // Muestra un mensaje de éxito o redirige a otra página según tu lógica
      console.log('Factura realizada con éxito!');
    }).catch(error => {
      // Maneja los errores aquí
      console.error('Error al guardar la factura:', error);
    });
  }
}

