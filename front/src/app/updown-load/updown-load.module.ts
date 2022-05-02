import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdownLoadPageRoutingModule } from './updown-load-routing.module';

import { UpdownLoadPage } from './updown-load.page';

import {ComponentsModule} from '../shared/components/components/components.module';
import {MyDecksComponent} from './my-decks/my-decks.component';
import {ViewDecksComponent} from './view-decks/view-decks.component';
import {SharedWithMeComponent} from './shared-with-me/shared-with-me.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdownLoadPageRoutingModule,
    ComponentsModule
  ],
  declarations: [UpdownLoadPage, MyDecksComponent, ViewDecksComponent, SharedWithMeComponent]
})
export class UpdownLoadPageModule {}
