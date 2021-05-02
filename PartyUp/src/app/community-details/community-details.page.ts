import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Community } from '../modal/Community';
import { AngularFireModule } from '@angular/fire';
import { CommunityService } from '../community.service';
import { User } from '../modal/User';
import { FirebaseService } from '../firebase.service';
import {Observable} from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Component({
  selector: 'app-community-details',
  templateUrl: './community-details.page.html',
  styleUrls: ['./community-details.page.scss'],
})
export class CommunityDetailsPage implements OnInit {

  community = null;
  private memberedCommunities: Observable<Community[]>;
  private allUsers: Observable<User[]>;

  isMember: boolean ;

  memberIDList: string[];
  memberNameList: Observable<User[]>;
  testUser: Observable<User>;

  private pic:string="";
  private description: string ="";
  constructor(public communityService:CommunityService,
    private router:Router,
    private route:ActivatedRoute,
    public fbService: FirebaseService,
    private afs: AngularFirestore) { }

  ngOnInit() {
    this.memberedCommunities=this.fbService.getMyMemberedCommunities();
    this.route.params.subscribe(
  		param=>{
  			this.community = param;
  		}
  	)
    this.memberedCommunities.subscribe(data => {
      return data.forEach(index =>{
        if(this.community.cid == index.cid)
        {
          this.isMember = true;
          this.memberIDList = index.memberIDList;
          this.fbService.loadCommunityMemberNames(this.memberIDList); // load the names of current community (but actually loads them all maybe???)
          this.memberNameList = this.fbService.getCommunityMemberNames();
        }
      })
    })
  }

  update()
  {
    if(this.description != "")
    {
      this.afs.collection("communities").doc(this.community.id).update({
        description: this.description
      })
    }
    if(this.pic != "")
    {
      this.pic = "./assets/" + this.pic + ".png";
      this.afs.collection("communities").doc(this.community.id).update({
        pic: this.pic
      })
    }
  }
}
