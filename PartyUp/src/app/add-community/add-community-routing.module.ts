import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCommunityPage } from './add-community.page';

const routes: Routes = [
  {
    path: '',
    component: AddCommunityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCommunityPageRoutingModule {}
