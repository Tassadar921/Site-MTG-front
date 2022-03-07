import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdownLoadPageRoutingModule } from './updown-load-routing.module';

import { UpdownLoadPage } from './updown-load.page';

import { MainMenuComponent } from '../shared/components/main-menu/main-menu.component';
import {MyDecksComponent} from './my-decks/my-decks.component';
import {ViewDecksComponent} from './view-decks/view-decks.component';
import {SharedWithMeComponent} from './shared-with-me/shared-with-me.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdownLoadPageRoutingModule
  ],
  declarations: [UpdownLoadPage, MainMenuComponent, MyDecksComponent, ViewDecksComponent, SharedWithMeComponent]
})
export class UpdownLoadPageModule {}
