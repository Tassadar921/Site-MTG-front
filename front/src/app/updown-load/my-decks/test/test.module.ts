import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular';

import {TestComponent} from './test.component';

@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [TestComponent]
})
export class TestModule {}
