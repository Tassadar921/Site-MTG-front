import { Component, OnInit } from '@angular/core';
import {HttpService} from '../shared/services/http.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {

  public numberInvits;
  public main = 0;
  public secondary = 0;

  constructor(
    public httpService: HttpService,
  ) {}

  async ngOnInit() {
    this.numberInvits = await this.httpService.getUserDemandsReceivedLength();
  }

  test = () => {
    console.log('test friends');
  };

  switchMain = (val) => this.main = val;
  switchSecondary = (val) => this.secondary = val;
}
