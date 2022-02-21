import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {GlobalVarsService} from '../shared/services/global-vars.service';
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

  ngOnInit() {
    this.loginServ.refresh();
  }

}
