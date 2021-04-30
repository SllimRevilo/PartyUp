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
      pic: aPic,
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

  // addMember(user,community) {
  //   var db=this.firebase;
  //   let newArray: string[] = []//old memberIDList
  //   db.collection("communities").doc(community).get().toPromise().then((querySnapshot: QuerySnapshot<DocumentData>) => {
  //     querySnapshot.forEach((doc:any) => {
  //       var data = doc.data();
  //       console.log(doc.id, " => ", doc.data());
  //       newArray = data.memberIDList;}
  //     });
  //   db.collection("communities").doc(community).update({
  //     memberIDList: newArray
  //   })
  // }
}
