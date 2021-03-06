import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { CommunityService } from '../community.service';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router,ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { Community } from '../modal/Community';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private communities: Observable<Community[]>;
  private ownedCommunities: Observable<Community[]>;
  private moddedCommunities: Observable<Community[]>;
  moddedCommunityCids =[];
  ownedCommunityCids =[];

  private src="./assets/party-hat.png";

  constructor(public firebase: AngularFirestore,
    private router: Router,
    public communityService: CommunityService,
    public fbService: FirebaseService,
    public angularFire: AngularFireAuth) { }

  ngOnInit() {
    this.communities = this.fbService.getMyCommunities();
  }

  logout()
  {
    let user = this.angularFire.currentUser;
    this.fbService.uid='';
    this.router.navigate(["/"]);
  }

  viewCommunity(community) {
    this.router.navigate(["/community-page",community]);

  }

  openJoinCommunityPage(){
    this.router.navigate(['join-community']);
  }

  openCreateCommunityPage(){
    this.router.navigate(['add-community']);
  }
  
  grouppg()
  {
    this.router.navigate(["community-page"]);
  }
  
  commdies()
  {
    this.router.navigate(["community-details"]);
  }

}
