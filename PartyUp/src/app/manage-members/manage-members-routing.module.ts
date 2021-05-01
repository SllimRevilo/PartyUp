import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageMembersPage } from './manage-members.page';

const routes: Routes = [
  {
    path: '',
    component: ManageMembersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageMembersPageRoutingModule {}
