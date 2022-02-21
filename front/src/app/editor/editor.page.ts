import { Component, OnInit } from '@angular/core';
import {LoginService} from '../shared/services/login.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit {

  public retour;

  constructor(
    private loginServ: LoginService,
  ) { }

  ngOnInit() {
    this.loginServ.refresh();
  }

}
