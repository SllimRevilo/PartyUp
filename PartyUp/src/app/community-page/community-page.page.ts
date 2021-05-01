import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { CommunityService } from '../community.service';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.page.html',
  styleUrls: ['./community-page.page.scss'],
})
export class CommunityPagePage implements OnInit {

  community = null;

  isPrivate: boolean = true;
  isModerator: boolean = true;
  isOwner: boolean = true;

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
  }

  viewCommunityDetails(community) {
    this.router.navigate(["community-details",this.community])
  }

  schedule()
  {
    this.router.navigate(["/add-event",this.community]);
  }
  test()
  {
    console.log("lul test");
    console.log(this.isPrivate);
  }
  goToCommunityCalendar()
  {
    this.router.navigate(["/community-calendar",this.community]);
  }
}
