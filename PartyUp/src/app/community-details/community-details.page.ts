import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { CommunityService } from '../community.service';
import { User } from '../modal/User';
import { FirebaseService } from '../firebase.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-community-details',
  templateUrl: './community-details.page.html',
  styleUrls: ['./community-details.page.scss'],
})
export class CommunityDetailsPage implements OnInit {

  community = null;

  memberIDList: [];
  memberNameList: Observable<User[]>;
  testUser: Observable<User>;

  private pic:string="";
  private description: string ="";
  constructor(public communityService:CommunityService,
    private router:Router,
    private route:ActivatedRoute,
    public fbService: FirebaseService) { }

  ngOnInit() {
    this.route.params.subscribe(
  		param=>{
  			this.community = param;
  		}
  	)
    this.memberIDList = this.fbService.getCommunityMembers(this.community);
    console.log("Member ID list:");
    console.log(this.memberIDList);
    
    // inspired by the order-list code from HW3
    this.fbService.loadCommunityMemberNames(this.memberIDList); // load the names of current community
    this.memberNameList = this.fbService.getCommunityMemberNames();
    //this.memberNameList = this.fbService.getCommunityMemberNames(); // assign names to printable array
    //this.memberNameList[0] = this.testUser // "Cannot set property '0' of undefined" error
    //console.log(this.memberNameList[0].username);
    // this.memberNameList = this.fbService.getCommunityMemberNames(this.memberIDList)
  }

  test()
  {
    console.log("lul test");
    console.log(this.pic);
    console.log(this.description);
  }
}
