import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { CommunityService } from '../community.service';
import { User } from '../modal/User';
import { FirebaseService } from '../firebase.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Community } from '../modal/Community';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AlertController} from '@ionic/angular';


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
  private allCommunities: Observable<Community[]>;


  constructor(public communityService:CommunityService,
    private router:Router,
    private route:ActivatedRoute,
    public fbService: FirebaseService,
    private afs: AngularFirestore,    
    private alertController:AlertController
    ) { }

  ngOnInit() {
    this.allCommunities = this.fbService.getAllCommunities();

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
          this.memberIDList = index.memberIDList;
          this.fbService.loadCommunityMemberNames(this.memberIDList); // load the names of current community (but actually loads them all maybe???)
          this.memberNameList = this.fbService.getCommunityMemberNames();
        }
      })
    })
  }

  editButton(aUser)
  {
    this.presentAlertConfirm(aUser);
  }

  async presentAlertConfirm(aUser) {
    
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'What would you like to do with this user',
      buttons: [
        {
          text: 'Make mod',
          handler: () => {
            this.makeMod(aUser);
          }
        },{
          text: 'Remove mod',
          handler: () => {
            this.removeMod(aUser);
          }
        },{
          text: 'Kick user',
          handler: () => {
            this.kickUser(aUser);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, 
        
      ]
    });
    await alert.present();
  }

  kickUser(aUser)
  {
    this.allCommunities.subscribe(data=> {
      return data.forEach(index => {
        if(this.community.cid == index.cid)
        {
          if(index.memberIDList.includes(aUser.uid))
          {
            
            const i = index.memberIDList.indexOf(aUser.uid, 0)
            if(i>-1)
            {
              index.memberIDList.splice(i,1);
            }

            this.afs.collection("communities").doc(this.community.id).update({
              memberIDList: index.memberIDList
            })
          }
          else
          {
            return;
          }
          
        }
      })
    })
  }

  makeMod(aUser)
  {
    this.allCommunities.subscribe(data=> {
      return data.forEach(index => {
        if(this.community.cid == index.cid)
        {
          if(index.modIDList.includes(aUser.uid))
          {
            return;
          }
          index.modIDList.push(aUser.uid)
          this.afs.collection("communities").doc(this.community.id).update({
            modIDList: index.modIDList
          })
        }
      })
    })
  }

  removeMod(aUser)
  {
    this.allCommunities.subscribe(data=> {
      return data.forEach(index => {
        if(this.community.cid == index.cid)
        {
          if(index.modIDList.includes(aUser.uid))
          {
            
            const i = index.modIDList.indexOf(aUser.uid, 0)
            if(i>-1)
            {
              index.modIDList.splice(i,1);
            }

            this.afs.collection("communities").doc(this.community.id).update({
              modIDList: index.modIDList
            })
          }
          else
          {
            return;
          }
          
        }
      })
    })
  }

}
