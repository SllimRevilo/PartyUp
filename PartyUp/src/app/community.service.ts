import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(public firebase: AngularFirestore) { }

  createCommunity(title,description,userID) {
    let randomID = Math.random().toString(36).substr(2,5);
    var db=this.firebase;
    db.collection("communities").add({
      name: title,
      description: description,
      cid: randomID,
      memberIDList: [userID],
      modIDList: [userID],
      ownerIDList: [userID]
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }
}
