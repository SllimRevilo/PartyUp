import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { CommunityService } from '../community.service';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {
  community = null;
  minDate = new Date().toISOString();
  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false,
    community: ''
  };

  constructor( private router:Router,
    private route:ActivatedRoute,
    public fbService: FirebaseService,
    private afs: AngularFirestore) { }

  ngOnInit() {
    this.route.params.subscribe(
  		param=>{
  			this.community = param;
        console.log(param);
  		}
  	)
  }

  addEvent()
  {
    console.log(this.event.title)
    console.log(this.event.desc)
    console.log(this.event.startTime)
    console.log(this.event.endTime)
    console.log(this.event.allDay)

    this.afs.collection("events").add({
      title: this.event.title,
      desc: this.event.desc,
      startTime: this.event.startTime,
      endTime: this.event.endTime,
      allDay: this.event.allDay,
      community: this.community.cid
    })
  }

}
