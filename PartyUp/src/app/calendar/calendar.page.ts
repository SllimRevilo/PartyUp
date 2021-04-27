import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import { MonthViewComponent } from 'ionic2-calendar/monthview';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  
  event = {
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    allDay: false
  }

  minDate = new Date().toISOString();

  eventSource = [];

  calendar =
  {
    mode:'month',
    currentDate: new Date()

  }

  viewTitle = 'Calendar'

  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  onEventSelected()
  {

  }
  constructor() { }

  ngOnInit() {
  }

  resetEvent()
  {
    this.event = {
      title: '',
      description: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }

  addEvent()
  {
    
  }


 

  onViewTitleChanged()
  {

  }

  onTimeSelected()
  {

  }


}
