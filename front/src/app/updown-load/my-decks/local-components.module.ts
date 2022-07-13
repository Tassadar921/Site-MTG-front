import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {UploadFileComponent} from './upload-file/upload-file.component';
import {UploadTextComponent} from './upload-text/upload-text.component';

import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

@NgModule({
  declarations: [
    UploadFileComponent,
    UploadTextComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  exports: [
    UploadFileComponent,
    UploadTextComponent
  ]
})
export class LocalComponentsModule { }
