import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommunityCalendarPageRoutingModule } from './community-calendar-routing.module';

import { CommunityCalendarPage } from './community-calendar.page';
import { NgCalendarModule } from 'ionic2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgCalendarModule,
    IonicModule,
    CommunityCalendarPageRoutingModule,
  ],
  declarations: [CommunityCalendarPage]
})
export class CommunityCalendarPageModule {}
