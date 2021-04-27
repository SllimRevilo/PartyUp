import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCommunityPageRoutingModule } from './add-community-routing.module';

import { AddCommunityPage } from './add-community.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    AddCommunityPageRoutingModule
  ],
  declarations: [AddCommunityPage]
})
export class AddCommunityPageModule {}
