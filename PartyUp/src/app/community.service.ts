import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AddCommunityPage } from './add-community/add-community.page';
import { QuerySnapshot } from '@firebase/firestore-types';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(public firebase: AngularFirestore) { }

  createCommunity(title,description,aPic, userID) {
    let randomID = Math.random().toString(36).substr(2,5);
    var db=this.firebase;
    db.collection("communities").add({
      name: title,
      description: description,
      cid: randomID,
      pic: "./assets/" + aPic +".png",
      memberIDList: [userID],
      modIDList: [userID],
      ownerIDList: [userID]
    })
    .then((docRef) => {
    })
    .catch((error) => {
    });
  }
}
