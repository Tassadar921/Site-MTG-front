import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {HttpService} from '../shared/services/http.service';
import {AddFriendComponent} from "./add-friend/add-friend.component";
import {SeeFriendsComponent} from "./see-friends/see-friends.component";
import {DemandsComponent} from './demands/demands.component';

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

  @ViewChild(DemandsComponent)demandsComponent: DemandsComponent;

  async ngOnInit() {
    this.numberInvits = await this.httpService.getUserDemandsReceivedLength();
  }

  switchMain = (val) => {
    this.main = val;
  };

  getNumberOfInvits = () => {
    if(this.secondary && this.main) {
      this.numberInvits = this.demandsComponent.demandsLength;
      this.switchSecondary(this.secondary);
    }
  };

  switchSecondary = (val) => {
    this.secondary = val;
    if(this.secondary) {
      setTimeout(
        this.getNumberOfInvits,
        1000);
    }
  };
}
