import { Component, OnInit } from '@angular/core';
import {LoginService} from '../shared/services/login.service';
import {GlobalVarsService} from '../shared/services/global-vars.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  public retour;

  constructor(
    private loginServ: LoginService,
    private glob: GlobalVarsService,
  ) { }

  async ngOnInit() {
    await this.loginServ.refresh();
  }

}
