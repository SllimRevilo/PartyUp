import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import {AngularFirestore } from '@angular/fire/firestore';
import {FirebaseService} from '../firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user= {email:"username@gmail.com", password:"password"}

  constructor(public afAuth: AngularFireAuth, 
  	private fbService: FirebaseService,
    public firebase:AngularFirestore,
    private router:Router) { }

  ngOnInit() {
  }

  login(email: string, password: string)
  {
  	// Promise<firebase.auth.UserCredential>
    this.afAuth.signInWithEmailAndPassword(email, password).then(user => {
      //navigate to user profile
      this.fbService.load_my_communities()
      this.fbService.load_all_communities();
      this.fbService.load_all_events();
      this.fbService.load_my_moderated_communities();
      this.fbService.load_my_owned_communities();
      this.fbService.load_my_membered_communities();
  
      var user1 = firebase.auth().currentUser;
      this.fbService.setUID(user.user.uid);
      // fbService
      var db = firebase.firestore();
      var self=this;
      db.collection("users").where("uid", "==", user1.uid)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {

                });
            })
            .catch(function(error) {
            });

            this.router.navigate(["tabs/tab1"]);
    })
    .catch(error => {
    });
    //this.fbService.showLogin=false
    
  }

  signUp()
  {
    this.router.navigate(["sign-up"]);
  }

}
