import { CalendarComponent } from 'ionic2-calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { formatDate, registerLocaleData } from '@angular/common';
import { MonthViewComponent } from 'ionic2-calendar/monthview'
import { WeekViewComponent } from 'ionic2-calendar/weekview'
import { DayViewComponent } from 'ionic2-calendar/dayview'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import { CommunityService } from '../community.service';
import { Community } from '../modal/Community';
import { FirebaseService } from '../firebase.service';
import {map, take} from 'rxjs/operators';
import { Event } from '../modal/Event';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  private communities: Observable<Community[]>;
  private communityCids = [];
  private events: Observable<Event[]>
  private eventCollection: AngularFirestoreCollection<Event>;

  event = {
    title: '',
    desc: '',
    startTime: new Date(),
    endTime: new Date(),
    community: '',
    allDay: false
  };
 
  minDate = new Date().toISOString();
 
  eventSource = [];
  viewTitle;
 
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
 
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
 
  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string,private afs: AngularFirestore,public fbService: FirebaseService) { }
 
  ngOnInit() {
    this.communities = this.fbService.getMyCommunities();
    this.resetEvent();
    this.events = this.fbService.getAllEvents();
  }

  ionViewWillEnter()
  {
    this.eventSource = [];
    this.communities.subscribe(data => {
      return data.forEach(index =>{
        this.communityCids.push(index.cid);
      })
    })
    this.events.subscribe(data => {
      return data.forEach(index =>{ 
        if(this.communityCids.includes(index.community))
        {
          this.event.title = index.title;
          this.event.desc = index.desc;
          this.event.startTime = new Date(index.startTime);
          this.event.endTime = new Date(index.endTime);
          this.event.allDay = index.allDay;
          this.event.community = index.community;
          this.eventSource.push(this.event)
          this.myCal.loadEvents();
        }
        this.resetEvent();
      })
    }

    )
  }
 
  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      startTime: new Date(),
      endTime: new Date(),
      community:'',
      allDay: false
    };
  }
 
  // Create the right event format and reload source
  addEvent() {
    let eventCopy = {
      title: this.event.title,
      startTime:  new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      community:this.event.community,
      desc: this.event.desc
    }
 
    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;
 
      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }

    let eventToStore = {
      title: eventCopy.title,
      startTime:  eventCopy.startTime.toISOString(),
      endTime: eventCopy.endTime.toISOString(),
      allDay: eventCopy.allDay,
      desc: eventCopy.desc
    }
 
    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.afs.collection("communities").doc(eventCopy.community).update({
      events: eventToStore
    })
    this.resetEvent();
  }

   // Change current month/week/day
 next() {
  var swiper = document.querySelector('.swiper-container')['swiper'];
  swiper.slideNext();
}
 
back() {
  var swiper = document.querySelector('.swiper-container')['swiper'];
  swiper.slidePrev();
}
 
// Change between month/week/day
changeMode(mode) {
  this.calendar.mode = mode;
}
 
// Focus today
today() {
  this.calendar.currentDate = new Date();
}
 
// Selected date reange and hence title changed
onViewTitleChanged(title) {
  this.viewTitle = title;
}
 
// Calendar event was clicked
async onEventSelected(event) {
  // Use Angular date pipe for conversion
  let start = formatDate(event.startTime, 'medium', this.locale);
  let end = formatDate(event.endTime, 'medium', this.locale);
 
  const alert = await this.alertCtrl.create({
    header: event.title,
    subHeader: event.desc,
    message: 'From: ' + start + '<br><br>To: ' + end,
    buttons: ['OK']
  });
  alert.present();
}
 
// Time slot was clicked
onTimeSelected(ev) {
  let selected = new Date(ev.selectedTime);
  this.event.startTime = selected;
  selected.setHours(selected.getHours() + 1);
  this.event.endTime = (selected);
}

setCommunity(community)
{
  this.event.community = community;
}




}
