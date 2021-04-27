import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { CommunityService } from '../community.service';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router,ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public firebase: AngularFirestore,
    private router: Router,
    public communityService: CommunityService,
    public fbService: FirebaseService,
    public angularFire: AngularFireAuth) { }

  ngOnInit() {
  }

  logout()
  {
    
  }

  openCreateCommunityPage(){
    this.router.navigate(['add-community']);
  }
  
  test()
  {
    this.router.navigate(["community-details"]);
  }

}
