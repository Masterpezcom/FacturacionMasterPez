import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { query, orderBy, updateDoc } from "firebase/firestore";


  @Injectable({
    providedIn: 'root'
  })
  export class ClienteService {

    constructor(private firestore: Firestore) { }

    agregarCliente(cliente: any) {
      const clienteRef = collection(this.firestore, 'clientes');
      return addDoc(clienteRef, cliente);
    }

    getClientes(): Observable<any[]> {
      const clienteRef = collection(this.firestore, 'clientes');
      return collectionData(clienteRef, { idField: 'id'}) as Observable<any[]>;

    }

    eliminarCliente(cliente: any) {
      const clienteDocRef = doc(this.firestore, `clientes/${cliente.id}`);
      return deleteDoc(clienteDocRef);
    }
    getCliente(cliente: any) {
      const clienteDocRef = doc(this.firestore, `clientes/${cliente.id}`);
      return updateDoc(clienteDocRef, cliente);

    }
  }
