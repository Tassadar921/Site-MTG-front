import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {IonicModule} from '@ionic/angular';

import {MainMenuComponent} from './main-menu/main-menu.component';
import {ViewMyDecksComponent} from './view-my-decks/view-my-decks.component';
import {ViewFriendsComponent} from './view-friends/view-friends.component';
import {ViewDecksComponent} from './view-decks/view-decks.component';

import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    MainMenuComponent,
    ViewMyDecksComponent,
    ViewFriendsComponent,
    ViewDecksComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    MainMenuComponent,
    ViewMyDecksComponent,
    ViewFriendsComponent,
    ViewDecksComponent,
  ],
})
export class ComponentsModule { }
