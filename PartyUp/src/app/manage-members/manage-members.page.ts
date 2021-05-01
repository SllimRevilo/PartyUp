import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { CommunityService } from '../community.service';
import { User } from '../modal/User';
import { FirebaseService } from '../firebase.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Community } from '../modal/Community';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-manage-members',
  templateUrl: './manage-members.page.html',
  styleUrls: ['./manage-members.page.scss'],
})
export class ManageMembersPage implements OnInit {

  community = null;
  private memberedCommunities: Observable<Community[]>;
  memberIDList: string[];
  memberNameList: Observable<User[]>;

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
          //this.isMember = true;
          this.memberIDList = index.memberIDList;
          console.log("Member ID list:");
          console.log(this.memberIDList);
          this.fbService.loadCommunityMemberNames(this.memberIDList); // load the names of current community (but actually loads them all maybe???)
          this.memberNameList = this.fbService.getCommunityMemberNames();
        }
      })
    })
  }

}
