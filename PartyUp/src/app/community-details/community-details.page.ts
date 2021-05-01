import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Community } from '../modal/Community';
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
    public fbService: FirebaseService) { }

  ngOnInit() {
    this.memberedCommunities=this.fbService.getMyMemberedCommunities();
    // this.route.params.subscribe(
  	// 	param=>{
  	// 		this.community = param;
  	// 	}
  	// )
    this.memberedCommunities.subscribe(data => {
      return data.forEach(index =>{
        if(this.community.cid == index.cid)
        {
          this.isMember = true;
          this.memberIDList = index.memberIDList;
          console.log("memberIDList: ")
          console.log(this.memberIDList)
        }
      })
    })
    //this.fbService.load_all_users(); // load all users
    //if (this.community.member)
    // this.memberIDList = this.fbService.getCommunityMembers(this.community);
    // console.log("Member ID list:");
    // console.log(this.memberIDList);
    
    // inspired by the order-list code from HW3

    //this.fbService.loadCommunityMemberNames(this.memberIDList); // load the names of current community
    //this.memberNameList = this.fbService.getCommunityMemberNames();

    //this.memberNameList = this.fbService.getCommunityMemberNames(); // assign names to printable array
    //this.memberNameList[0] = this.testUser // "Cannot set property '0' of undefined" error
    //console.log(this.memberNameList[0].username);
    //this.memberNameList = this.fbService.getCommunityMemberNames(this.community);
    // this.memberNameList = this.fbService.getCommunityMemberNames(this.memberIDList)
  }

  // getCommunityMembers(aCommunity) {
  //   console.log(aCommunity);
    
  //   this.allUsers.subscribe(data=> {
  //     return data.forEach(index => {
  //       if(aCommunity.cid == index.uid)
  //       {
  //         console.log("I did this");
  //         index.memberIDList.push(this.fbService.getUserID())
  //         this.afs.collection("communities").doc(aCommunity.id).update({
  //           memberIDList: index.memberIDList
  //         })
  //       }
  //     })
  //   })
  // }

  test()
  {
    console.log("lul test");
    console.log(this.pic);
    console.log(this.description);
  }
}
