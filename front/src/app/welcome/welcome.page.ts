import { Component, OnInit } from '@angular/core';
import {LoginService} from '../shared/services/login.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  public retour;

  constructor(
    private loginServ: LoginService,
  ) { }

  async ngOnInit() {
    await this.loginServ.refresh();
  }

}
