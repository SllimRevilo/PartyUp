import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
//import {Item,Order} from '../modal/Item';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import {map, take} from 'rxjs/operators';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  uid='';

  constructor(private afs: AngularFirestore) { }

    setUID(uid){
    this.uid=uid;
    console.log(this.uid);
    }
  
    getUserID(){
    return this.uid
    }

    
}
