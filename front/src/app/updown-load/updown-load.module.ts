import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdownLoadPageRoutingModule } from './updown-load-routing.module';

import { UpdownLoadPage } from './updown-load.page';

import {ComponentsModule} from '../shared/components/components.module';
import {SharedWithMeComponent} from './shared-with-me/shared-with-me.component';
import {MyDecksComponent} from './my-decks/my-decks.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdownLoadPageRoutingModule,
    ComponentsModule
  ],
  declarations: [UpdownLoadPage, SharedWithMeComponent, MyDecksComponent]
})
export class UpdownLoadPageModule {}
