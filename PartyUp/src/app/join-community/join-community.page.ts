import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { CommunityService } from '../community.service';
import { FirebaseService } from '../firebase.service';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import { Community } from '../modal/Community';
import firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AlertController} from '@ionic/angular';


@Component({
  selector: 'app-join-community',
  templateUrl: './join-community.page.html',
  styleUrls: ['./join-community.page.scss'],
})
export class JoinCommunityPage implements OnInit {

  private allCommunities: Observable<Community[]>;
  private allCommunitiesBackup: Observable<Community[]>;
  private communityCompleteCollection: AngularFirestoreCollection<Community>;

  constructor(public communityService:CommunityService,
    private router:Router,
    private route:ActivatedRoute,
    public fbService: FirebaseService,
    private afs: AngularFirestore,
    private alertController:AlertController) { }

  ngOnInit() {
    this.allCommunities = this.fbService.getAllCommunities();
    this.allCommunitiesBackup = this.allCommunities
    this.communityCompleteCollection = this.fbService.getCommunityCompleteCollection();
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

  joinButton(aCommunity)
  {
    this.presentAlertConfirm(aCommunity);
  }

  async presentAlertConfirm(aCommunity) {
    //console.log("hello");
    
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Are you sure you want to join this community',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //console.log('Confirm Cancel: blahhhhh')
          }
        }, {
          text: 'Okay',
          handler: () => {
            //console.log('Confirm Okay');
            this.joinCommunity(aCommunity);
          }
        }
      ]
    });
    await alert.present();
  }

  joinCommunity(aCommunity) {
    console.log(aCommunity);
    
    this.allCommunities.subscribe(data=> {
      return data.forEach(index => {
        if(aCommunity.cid == index.cid)
        {
          if(index.memberIDList.includes(this.fbService.getUserID()))
          {
            return;
          }
          console.log("I did this");
          index.memberIDList.push(this.fbService.getUserID())
          this.afs.collection("communities").doc(aCommunity.id).update({
            memberIDList: index.memberIDList
          })
        }
      })
    })
    
  }

}
