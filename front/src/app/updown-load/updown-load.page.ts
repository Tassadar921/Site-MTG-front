import { Component, OnInit } from '@angular/core';
import {LoginService} from '../shared/services/login.service';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-updown-load',
  templateUrl: './updown-load.page.html',
  styleUrls: ['./updown-load.page.scss'],
})
export class UpdownLoadPage implements OnInit {

  public main = 0;
  constructor(
    private loginServ: LoginService,
    private modal: ModalController,
  ) { }

  async ngOnInit() {
    await this.loginServ.refresh();
  }

  switchMain = (val) => {
    this.main = val;
  };

  dismiss = () => {
    this.modal.dismiss();
  };
}
