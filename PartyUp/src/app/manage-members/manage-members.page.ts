import { Component, OnInit } from '@angular/core';
import { AlertController} from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-manage-members',
  templateUrl: './manage-members.page.html',
  styleUrls: ['./manage-members.page.scss'],
})
export class ManageMembersPage implements OnInit {
  community = null;
  constructor(private alertController:AlertController,
    private router:Router,
    private route:ActivatedRoute,) { }

  ngOnInit() {
    this.route.params.subscribe(
  		param=>{
  			this.community = param;
  		}
  	)
  }

  joinButton(aUser)
  {
    this.presentAlertConfirm(aUser);
  }

  async presentAlertConfirm(aUser) {
    //console.log("hello");
    
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'What would you like to do with this user',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //console.log('Confirm Cancel: blahhhhh')
          }
        }, {
          text: 'Make mod',
          handler: () => {
            //console.log('Confirm Okay');
            this.makeMod(aUser);
          }
        },{
          text: 'Kick user',
          handler: () => {
            //console.log('Confirm Okay');
            this.kickUser(aUser);
          }
        },
        
      ]
    });
    await alert.present();
  }

  kickUser(aUser)
  {
    console.log("KICK lul")
  }

  makeMod(aUser)
  {
    console.log("mod lul")
  }

}
