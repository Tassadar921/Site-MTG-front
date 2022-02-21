import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import * as moment from 'moment';
import {LoginService} from '../shared/services/login.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {

  public users = [];
  public displayUsers = [];
  public hour;

  private retour;

  constructor(
    private http: HttpClient,
    private loginServ: LoginService,
  ) { }

  ngOnInit() {

    this.loginServ.refresh();
    this.http.post(environment.urlBack + '', '').subscribe(response => {
      this.retour = response;
    });
    this.http.post(environment.urlBack + 'getUsers', '').subscribe(response => {
      this.retour = response;
      this.users = this.retour.output;
      this.displayUsersFunction(0);
    });
  }

  test = () =>{
    if(moment().format('h:mm:ss a').includes('pm')){
      let cut;
      for(let i = 0; i<moment().format('h:mm:ss a').length;i++){
        if(moment().format('h:mm:ss a')[i]===':'){
          cut = i;
          i=moment().format('h:mm:ss a').length;
        }
      }
      if(moment().format('h:mm:ss a')[0]==='1' && moment().format('h:mm:ss a')[1]==='2'){
        this.hour = ('0' + moment().format('h:mm:ss a').slice(cut, moment().format('h:mm:ss a').length-6));
      }else{
        this.hour = (Number(moment().format('h:mm:ss a').slice(0,cut))+12)
          .toString()+moment().format('h:mm:ss a')
          .slice(cut, moment().format('h:mm:ss a').length-6);
      }
    }else{
      this.hour = moment().format('h:mm:ss a')
        .slice(0, moment().format('h:mm:ss a').length-6);
    }
  };

  displayUsersFunction = (n) =>{
    if(this.users.length>11*n+1) {
      for (let i = 10 * n; i < 11 * n + 1; i++) {
        this.displayUsers[i] = this.users[i];
      }
    }else{
      for(let i=10*n;i<this.users.length;i++){
        this.displayUsers[i] = this.users[i];
      }
    }
  };

}
