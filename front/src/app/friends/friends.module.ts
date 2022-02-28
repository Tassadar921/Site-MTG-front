import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FriendsPageRoutingModule } from './friends-routing.module';

import { FriendsPage } from './friends.page';

import { MainMenuComponent } from '../shared/components/main-menu/main-menu.component';

import { SeeFriendsComponent } from './see-friends/see-friends.component';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { DemandsComponent } from './demands/demands.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FriendsPageRoutingModule
  ],
  declarations: [FriendsPage, MainMenuComponent, SeeFriendsComponent, AddFriendComponent, DemandsComponent]
})
export class FriendsPageModule {}
