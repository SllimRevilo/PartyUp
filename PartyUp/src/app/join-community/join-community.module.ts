import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinCommunityPageRoutingModule } from './join-community-routing.module';

import { JoinCommunityPage } from './join-community.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoinCommunityPageRoutingModule
  ],
  declarations: [JoinCommunityPage]
})
export class JoinCommunityPageModule {}
