import { Component, OnInit } from '@angular/core';
import {LoginService} from '../shared/services/login.service';
@Component({
  selector: 'app-updown-load',
  templateUrl: './updown-load.page.html',
  styleUrls: ['./updown-load.page.scss'],
})
export class UpdownLoadPage implements OnInit {

  public main = 0;
  constructor(
    private loginServ: LoginService,
  ) { }

  async ngOnInit() {
    await this.loginServ.refresh();
  }

  switchMain = (val) => {
    this.main = val;
  };
}
