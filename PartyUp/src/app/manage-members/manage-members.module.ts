import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageMembersPageRoutingModule } from './manage-members-routing.module';

import { ManageMembersPage } from './manage-members.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageMembersPageRoutingModule
  ],
  declarations: [ManageMembersPage]
})
export class ManageMembersPageModule {}
