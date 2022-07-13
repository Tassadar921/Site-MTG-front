import { Component, OnInit } from '@angular/core';
import {HttpLinkService} from '../http-link.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {

  constructor(
    public linkWithBack: HttpLinkService,
  ) {}

  ngOnInit() {}



}
