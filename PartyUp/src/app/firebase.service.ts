import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Community } from './modal/Community';
//import {Item,Order} from '../modal/Item';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import {map, take} from 'rxjs/operators';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private communities: Observable<Community[]>;
  private communityCollection: AngularFirestoreCollection<Community>;

  uid='';

  constructor(private afs: AngularFirestore) {
    this.communityCollection = this.afs.collection<Community>('communities');
    // this.itemCollection = this.afs.collection<Note>('notes',ref => ref.where('uid', '==', 'large'));

    this.communities = this.communityCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            // console.log(data)
            const id = a.payload.doc.id;
            // console.log("run after adding new node? ")
            return { id, ...data };
          });
        })
    );
    console.log("communities loaded...")

  
   }

    setUID(uid){
    this.uid=uid;
    console.log(this.uid);
    }
  
    getUserID(){
    return this.uid
    }

    
}
