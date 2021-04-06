import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommunityPagePageRoutingModule } from './community-page-routing.module';

import { CommunityPagePage } from './community-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommunityPagePageRoutingModule
  ],
  declarations: [CommunityPagePage]
})
export class CommunityPagePageModule {}
