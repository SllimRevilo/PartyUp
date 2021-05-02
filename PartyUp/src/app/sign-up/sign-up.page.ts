import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  user= {email:"",password:"",username:""};

constructor(public afAuth: AngularFireAuth,private router:Router) { }

ngOnInit() {
}
  signUpWithEmail(email: string, password: string) {


  this.afAuth.createUserWithEmailAndPassword(email,password).then(user => {
    // navigate to user profile


    var db = firebase.firestore();
    db.collection("users").add({
                'uid':user.user.uid,
                'username':this.user.username
          })
          .then(function(docRef) {

              //update this products arrays
          })
          .catch(function(error) {
          });

  })
  .catch(error => {
  });;


    this.router.navigateByUrl('/');
  }
}
