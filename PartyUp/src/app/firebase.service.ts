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
  private allCommunities: Observable<Community[]>;
  private communityCollection: AngularFirestoreCollection<Community>;
  private communityCompleteCollection: AngularFirestoreCollection<Community>;

  uid='';

  constructor(private afs: AngularFirestore) {
    // this.communityCollection = this.afs.collection<Community>('communities');

    // this.communities = this.communityCollection.snapshotChanges().pipe(
    //     map(actions => {
    //       return actions.map(a => {
    //         const data = a.payload.doc.data();
    //         // console.log(data)
    //         const id = a.payload.doc.id;
    //         // console.log("run after adding new node? ")
    //         return { id, ...data };
    //       });
    //     })
    // );
    // console.log("communities loaded...")
   }

   load_my_communities(){ //after user login, call this function
    var user = firebase.auth().currentUser;
    if(user == null){
      return 
    }
    console.log(user.uid);
    var uid=user.uid;
    this.communityCollection = this.afs.collection<Community>('communities',ref => ref.where('memberIDList', 'array-contains', uid));
    //this.cartCollection = this.afs.collection<Order>('cart',ref => ref.where('uid', '==', uid));

    this.communities = this.communityCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
    );
    console.log("communities  loaded...")
  }

  load_all_communities(){
    var user = firebase.auth().currentUser;
    if(user == null){
      return 
    }
    this.communityCompleteCollection = this.afs.collection<Community>('communities');
    this.allCommunities = this.communityCompleteCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
    );
    console.log("ALL communities  loaded...")
  }

  setUID(uid){
    this.uid=uid;
    console.log(this.uid);
  }
  
  getUserID(){
    return this.uid
  }

  getMyCommunities(){
      return this.communities
  }

  getAllCommunities(){
    return this.allCommunities
  }

  getCommunityMembers(community) {
    return community.memberIDList;
  }

  // getCommunityMemberNames(memberIDList) {
  //   var db = firebase.firestore();
  //   var memberNameList = [];
  //   memberIDList.forEach(function (element) {
  //     db.collection("users").where("uid", "==", memberIDList[element])
  //         .get()
  //         .then(function(querySnapshot) {
  //           memberNameList.push(querySnapshot.username)
  //             querySnapshot.forEach(function(data) {
  //               memberNameList.push(data.username);
  //             });
  //           });
  //         });
  //   return memberNameList;
  // }
    
}
