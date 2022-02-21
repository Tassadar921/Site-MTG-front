import { Component, OnInit } from '@angular/core';
import {LoginService} from '../shared/services/login.service';

@Component({
  selector: 'app-database',
  templateUrl: './database.page.html',
  styleUrls: ['./database.page.scss'],
})
export class DatabasePage implements OnInit {

  public retour;

  constructor(
    private loginServ: LoginService,
  ) { }

  ngOnInit() {
    this.loginServ.refresh();
  }

}
