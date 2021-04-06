import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommunityDetailsPageRoutingModule } from './community-details-routing.module';

import { CommunityDetailsPage } from './community-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommunityDetailsPageRoutingModule
  ],
  declarations: [CommunityDetailsPage]
})
export class CommunityDetailsPageModule {}
