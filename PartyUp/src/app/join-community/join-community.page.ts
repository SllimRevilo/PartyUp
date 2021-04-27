import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { CommunityService } from '../community.service';
import { FirebaseService } from '../firebase.service';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import { Community } from '../modal/Community';

@Component({
  selector: 'app-join-community',
  templateUrl: './join-community.page.html',
  styleUrls: ['./join-community.page.scss'],
})
export class JoinCommunityPage implements OnInit {

  private allCommunities: Observable<Community[]>;
  private allCommunitiesBackup: Observable<Community[]>;

  constructor(public communityService:CommunityService,
    private router:Router,
    private route:ActivatedRoute,
    public fbService: FirebaseService) { }

  ngOnInit() {
    this.allCommunities = this.fbService.getAllCommunities();
    this.allCommunitiesBackup = this.allCommunities
  }

  async filterList(evt) {
    this.allCommunities = this.allCommunitiesBackup;
    const searchTerm = evt.srcElement.value;
  
    if (!searchTerm) {
      return;
    }
  
    this.allCommunities = this.allCommunitiesBackup.pipe (
      map(items => 
       items.filter(currentCommunity => currentCommunity.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)) )
    // this.allCommunities = this.allCommunitiesBackup.filter(currentCommunity => {
    //   if (currentCommunity.name && searchTerm) {
    //     return (currentCommunity.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
    //   }
    // })
  }

}
