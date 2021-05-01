import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommunityCalendarPage } from './community-calendar.page';

const routes: Routes = [
  {
    path: '',
    component: CommunityCalendarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityCalendarPageRoutingModule {}
