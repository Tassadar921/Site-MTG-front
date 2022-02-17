import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdownLoadPage } from './updown-load.page';

const routes: Routes = [
  {
    path: '',
    component: UpdownLoadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdownLoadPageRoutingModule {}
