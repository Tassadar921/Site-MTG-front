import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {GlobalVarsService} from '../shared/services/global-vars.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {

  public numberInvits;
  public main = 1;
  public secondary = 1;

  private retour;

  constructor(
    private http: HttpClient,
    private glob: GlobalVarsService,
  ) {}

  ngOnInit() {
    const data = {name: this.glob.getNickname()};
    this.http.post(environment.urlBack + 'getUserDemandsReceived', data).subscribe(response => {
      this.retour = response;
      this.numberInvits=this.retour.demands.length;
    });
  }

  switchMain = (val) => this.main = val;
  switchSecondary = (val) => this.secondary = val;
}
