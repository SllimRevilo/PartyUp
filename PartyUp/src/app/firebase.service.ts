import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Community } from './modal/Community';
import { User } from './modal/User';
import { Event } from './modal/Event';
//import {Item,Order} from '../modal/Item';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, take } from 'rxjs/operators';
import firebase from 'firebase/app';
import { debug } from 'node:console';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private communities: Observable<Community[]>;
  private memberCommunities: Observable<Community[]>;
  private moddedCommunities: Observable<Community[]>;
  private ownedCommunities: Observable<Community[]>;
  private allCommunities: Observable<Community[]>;
  private communityCollection: AngularFirestoreCollection<Community>;
  private communityMemberCollection: AngularFirestoreCollection<Community>;
  private communityModCollection: AngularFirestoreCollection<Community>;
  private communityOwnedCollection: AngularFirestoreCollection<Community>;
  private communityCompleteCollection: AngularFirestoreCollection<Community>;
  private events: Observable<Event[]>;
  private allEvents: Observable<Event[]>;
  private eventCollection: AngularFirestoreCollection<Event>;
  private eventCompleteCollection: AngularFirestoreCollection<Event>;
  private userNames: Observable<User[]>
  private userNameCollections: AngularFirestoreCollection<User>;

  private users: Observable<User[]>
  private allUsersCollections: AngularFirestoreCollection<User>;

  uid = '';

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

  load_my_membered_communities()
  {
    var user = firebase.auth().currentUser;
    if (user == null) {
      return
    }
    console.log(user.uid);
    var uid = user.uid;
    this.communityMemberCollection = this.afs.collection<Community>('communities', ref => ref.where('memberIDList', 'array-contains', uid));
    this.memberCommunities = this.communityMemberCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    console.log("membered communities  loaded...")
  }

  load_my_moderated_communities()
  {
    var user = firebase.auth().currentUser;
    if (user == null) {
      return
    }
    console.log(user.uid);
    var uid = user.uid;
    this.communityModCollection = this.afs.collection<Community>('communities', ref => ref.where('modIDList', 'array-contains', uid));
    //this.cartCollection = this.afs.collection<Order>('cart',ref => ref.where('uid', '==', uid));

    this.moddedCommunities = this.communityModCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    console.log("modded communities  loaded...")
  }

  load_my_owned_communities()
  {
    var user = firebase.auth().currentUser;
    if (user == null) {
      return
    }
    console.log(user.uid);
    var uid = user.uid;
    this.communityOwnedCollection = this.afs.collection<Community>('communities', ref => ref.where('ownerIDList', 'array-contains', uid));
    //this.cartCollection = this.afs.collection<Order>('cart',ref => ref.where('uid', '==', uid));

    this.ownedCommunities = this.communityOwnedCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    console.log("owned communities  loaded...")
  }

  load_my_communities() { //after user login, call this function
    var user = firebase.auth().currentUser;
    if (user == null) {
      return
    }
    console.log(user.uid);
    var uid = user.uid;
    this.communityCollection = this.afs.collection<Community>('communities', ref => ref.where('memberIDList', 'array-contains', uid));
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

  load_all_communities() {
    var user = firebase.auth().currentUser;
    if (user == null) {
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

  load_all_users() {
    this.allUsersCollections = this.afs.collection<User>('users');
    this.users = this.allUsersCollections.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    console.log("ALL users  loaded...")
  }

  load_all_events() {
    var user = firebase.auth().currentUser;
    if (user == null) {
      return
    }
    this.eventCompleteCollection = this.afs.collection<Event>('events');
    this.allEvents = this.eventCompleteCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    console.log("ALL events  loaded...")
  }

  setUID(uid) {
    this.uid = uid;
    console.log(this.uid);
  }

  getUserID() {
    return this.uid
  }

  getMyCommunities() {
    return this.communities
  }
  getMyMemberedCommunities(){
    return this.memberCommunities
  }
  getMyModdedCommunities() {
    return this.moddedCommunities
  }
  getMyOwnedCommunities() {
    return this.ownedCommunities
  }

  getAllCommunities() {
    return this.allCommunities
  }

  getCommunityMembers(community) {
    return community.memberIDList;
  }
  
  getAllEvents() {
    return this.allEvents;
  }

  getCommunityCompleteCollection()
  {
    return this.communityCompleteCollection;
  }

  loadCommunityMemberNames(memberIDList) {
    var db = firebase.firestore();
    for (let i = 0; i < memberIDList.length; i++) {
    //console.log(memberIDList[i])
    this.userNameCollections = this.afs.collection<User>('users'), ref => ref.where("uid", "==", memberIDList[i]);
    // console.log("userNameCollections:")
    // console.log(this.userNameCollections)
    this.userNames = this.userNameCollections.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    }
    //console.log(this.userNames[0].username);
    // for (let i = 0; i < memberIDList.length; i++) {
    //   //memberNameList.push(db.collection("users").where("uid", "==", memberIDList[i]).get())
    //   db.collection("users").where("uid", "==", memberIDList[i])
    //     .get()
    //     .then(function (querySnapshot) {
    //       //memberNameList.push(querySnapshot.username)
    //       querySnapshot.forEach(function (data) {
    //         memberNameList.push(data.);
    //       });
    //     });
    // }
    // return memberNameList;
  }


  getCommunityMemberNames() {
    return this.userNames;
  }

}
