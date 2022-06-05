import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditorPageRoutingModule } from './editor-routing.module';

import { EditorPage } from './editor.page';

import { ComponentsModule} from '../shared/components/components.module';
import {EditingCardComponent} from './editing-card/editing-card.component';

import {DragAndDropModule} from 'angular-draggable-droppable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditorPageRoutingModule,
    ComponentsModule,
    DragAndDropModule
  ],
  declarations: [EditorPage,EditingCardComponent]
})
export class EditorPageModule {}
