import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { CommunityService } from '../community.service';
import { FirebaseService } from '../firebase.service';
import { Community } from '../modal/Community';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.page.html',
  styleUrls: ['./community-page.page.scss'],
})
export class CommunityPagePage implements OnInit {

  community = null;
  private ownedCommunities: Observable<Community[]>;
  private moddedCommunities: Observable<Community[]>;

  isModerator: boolean ;
  isOwner: boolean;

  constructor(public communityService:CommunityService,
    private router:Router,
    private route:ActivatedRoute,
    public fbService: FirebaseService) { }

  ngOnInit() {
    this.ownedCommunities=this.fbService.getMyOwnedCommunities();
    this.moddedCommunities=this.fbService.getMyModdedCommunities();
    this.route.params.subscribe(
  		param=>{
  			this.community = param;
  		}
  	)
    this.moddedCommunities.subscribe(data => {
      return data.forEach(index =>{
        if(this.community.cid == index.cid)
        {
          this.isModerator = true;
        }
      })
    })
    this.ownedCommunities.subscribe(data => {
      return data.forEach(index =>{
        if(this.community.cid == index.cid)
        {
          this.isOwner = true;
        }
      })
    })

  }

  ionViewWillEnter()
  {

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
  }
  goToCommunityCalendar()
  {
    this.router.navigate(["/community-calendar",this.community]);
  }
}
