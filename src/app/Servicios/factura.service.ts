import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { query, orderBy, updateDoc, DocumentReference, DocumentData, serverTimestamp } from "firebase/firestore";
import { setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private firestore: Firestore) { }

  // Agregar una nueva factura a Firebase
  async agregarFactura(factura: any) {
    const facturaRef = collection(this.firestore, 'facturas');
    factura.fechaCreacion = serverTimestamp();
    factura.fechaActualizacion = serverTimestamp();
    // Calcular el total (precio del servicio por la cantidad)
    factura.total = this.calcularTotal(factura);

    return addDoc(facturaRef, factura);
  }


  // Obtener la lista de clientes desde Firebase
  getClientes(): Observable<any[]> {
    const clienteRef = collection(this.firestore, 'clientes');
    return collectionData(clienteRef, { idField: 'id'}) as Observable<any[]>;
  }

  // Obtener la lista de servicios desde Firebase
  getServicio(): Observable<any[]> {
    const servicioRef = collection(this.firestore, 'servicios');
    return collectionData(servicioRef, { idField: 'id'}) as Observable<any[]>;
  }


  // Obtener la lista de facturas desde Firebase
  getFacturas(): Observable<any[]> {
    const facturaRef = collection(this.firestore, 'facturas');
    return collectionData(facturaRef, { idField: 'id' }) as Observable<any[]>;
  }

  // Eliminar la factura
  eliminarFactura(factura: any) {
    const facturaDocRef = doc(this.firestore, `facturas/${factura.id}`);
    return deleteDoc(facturaDocRef);
  }


  // Editar la factura
  editarFactura(facturaId: string, nuevosDatos: any) {
    // Calcular el total antes de actualizar la factura
    nuevosDatos.total = this.calcularTotal(nuevosDatos);

    const facturaDocRef = doc(this.firestore, `facturas/${facturaId}`);
    return updateDoc(facturaDocRef, nuevosDatos);
  }

  private calcularTotal(factura: any): number {
    // Realizar la lógica para calcular el total (por ejemplo, cantidad * precio)
    return factura.cantidad * factura.precio;
  }
}
