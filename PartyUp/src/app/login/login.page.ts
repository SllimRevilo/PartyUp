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
    console.log("signin ...");
    this.afAuth.signInWithEmailAndPassword(email, password).then(user => {
      //navigate to user profile
      console.log(user.user.email, user.user.uid);
      this.fbService.load_my_communities()
      this.fbService.load_all_communities();
      this.fbService.load_all_events();
  
      var user1 = firebase.auth().currentUser;
      console.log(user1.uid)
      this.fbService.setUID(user.user.uid);
      // fbService
      var db = firebase.firestore();
      var self=this;
      db.collection("users").where("uid", "==", user1.uid)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshot
                    console.log(doc.id, " => ", doc.data());
                    //var type = doc.data().usertype;
                    //console.log("usertype:"+type);
                    //self.fbService.setUsertype(type);
                    // if(type == 'owner') {
                    //   self.fbService.isOwner = true;
                    // }
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
            //this.router.navigate(["/product-list"])
            //this.router.navigate(["/"])
            //this.router.navigateByUrl('/home'); //might need to use navigateByURL('/') workaround for speed
            this.router.navigate(["tabs/tab1"]);
    })
    .catch(error => {
      console.log(error)
    });
    //this.fbService.showLogin=false
    
  }

  signUp()
  {
    this.router.navigate(["sign-up"]);
  }

}
