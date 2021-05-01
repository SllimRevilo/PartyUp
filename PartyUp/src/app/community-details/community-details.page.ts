import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { CommunityService } from '../community.service';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-community-details',
  templateUrl: './community-details.page.html',
  styleUrls: ['./community-details.page.scss'],
})
export class CommunityDetailsPage implements OnInit {

  community = null;

  memberIDList: [];
  memberNameList: any[];

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
    this.memberNameList = this.fbService.getCommunityMemberNames(this.community);
    // this.memberNameList = this.fbService.getCommunityMemberNames(this.memberIDList)
  }

  test()
  {
    console.log("lul test");
    console.log(this.pic);
    console.log(this.description);
  }
}
