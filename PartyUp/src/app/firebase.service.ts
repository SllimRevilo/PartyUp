import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
//import {Item,Order} from '../modal/Item';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private afs: AngularFirestore) { }
}
