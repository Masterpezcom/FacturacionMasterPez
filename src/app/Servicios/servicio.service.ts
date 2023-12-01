import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { query, orderBy, updateDoc, DocumentReference, DocumentData } from "firebase/firestore";
import { setDoc } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class servicioService {

    constructor(private firestore: Firestore) { }

    agregarServicio(servicio: any) {
      const servicioRef = collection(this.firestore, 'servicios');
      return addDoc(servicioRef, servicio);
    }

    getServicio(): Observable<any[]> {
      const servicioRef = collection(this.firestore, 'servicios');
      return collectionData(servicioRef, { idField: 'id'}) as Observable<any[]>;

    }

    eliminarServicio(servicio: any) {
      const servicioDocRef = doc(this.firestore, `servicios/${servicio.id}`);
      return deleteDoc(servicioDocRef);
    }

    editarS(servicioId: string, nuevosDatos: any) {
      const servicioDocRef = doc(this.firestore, `servicios/${servicioId}`);
      return updateDoc(servicioDocRef, nuevosDatos);
    }

  }
