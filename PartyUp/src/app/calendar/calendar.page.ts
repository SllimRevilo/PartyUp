import { Component, OnInit } from '@angular/core';
import { MonthViewComponent } from 'ionic2-calendar/monthview';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  constructor() { }

  eventSource =[];
  calendar =
  {
    mode:'month',
    currentDate: new Date()

  }
  onEventSelected()
  {

  }

 

  onViewTitleChanged()
  {

  }

  onTimeSelected()
  {

  }

  ngOnInit() {
  }

}
