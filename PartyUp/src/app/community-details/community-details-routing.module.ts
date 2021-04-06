import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommunityDetailsPage } from './community-details.page';

const routes: Routes = [
  {
    path: '',
    component: CommunityDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityDetailsPageRoutingModule {}
