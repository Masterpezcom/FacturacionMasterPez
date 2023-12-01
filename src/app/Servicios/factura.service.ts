import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, Timestamp, serverTimestamp, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { query, orderBy, updateDoc } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private firestore: Firestore) { }

  guardarFactura(factura: any) {
    const facturaRef = collection(this.firestore, 'facturas');
    return addDoc(facturaRef, factura);
  }

}
