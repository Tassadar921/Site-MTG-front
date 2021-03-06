import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FriendsPageRoutingModule } from './friends-routing.module';

import { FriendsPage } from './friends.page';

import { ComponentsModule} from '../shared/components/components.module';

import { AddFriendComponent } from './add-friend/add-friend.component';
import { DemandsComponent } from './demands/demands.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FriendsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [FriendsPage, AddFriendComponent, DemandsComponent]
})
export class FriendsPageModule {}
