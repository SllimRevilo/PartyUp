import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommunityPagePage } from './community-page.page';

const routes: Routes = [
  {
    path: '',
    component: CommunityPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityPagePageRoutingModule {}
