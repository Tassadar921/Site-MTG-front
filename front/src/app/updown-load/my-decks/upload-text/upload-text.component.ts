import { Component, OnInit } from '@angular/core';
import {HttpLinkService} from '../http-link.service';

@Component({
  selector: 'app-upload-text',
  templateUrl: './upload-text.component.html',
  styleUrls: ['./upload-text.component.scss'],
})
export class UploadTextComponent implements OnInit {

  constructor(
    public linkWithBack: HttpLinkService,
  ) { }

  ngOnInit() {}

}
