import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import * as moment from 'moment';
import {LoginService} from '../shared/services/login.service';
import {GlobalVarsService} from '../shared/services/global-vars.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {

  public users = [];
  public displayUsers = [];
  public hour;
  public exists = 1;

  private retour;

  constructor(
    private http: HttpClient,
    private loginServ: LoginService,
    private glob: GlobalVarsService,
  ) { }

  ngOnInit() {

    this.http.post(environment.urlBack + '', '').subscribe(response => {
      this.retour = response;
    });

    const data = {name: this.glob.getNickname()};
    this.http.post(environment.urlBack + 'getUserListExceptOne', data).subscribe(res => {
      this.loginServ.refresh();
      this.retour = res;
      this.users = this.retour.output;
      this.displayUsersFunction(0);
      console.log('list : ', this.displayUsers);
    });
  }

  switch = (val) => { //toggle pour les components
    this.exists = val;
  };

  displayUsersFunction = (n) =>{
    if(this.users.length>11*n+2) {
      for (let i = 3 * n; i < 3 * n + 2; i++) {
        if(this.users[i].username!==this.glob.getNickname()){
          this.displayUsers[i] = this.users[i];
        }
      }
    }else{
      for(let i=3*n;i<this.users.length;i++){
        if(this.users[i].username!==this.glob.getNickname()){
          this.displayUsers[i] = this.users[i];
        }
      }
    }
  };

  addFriend=(username)=>{
    const data = {user: this.glob.getNickname(), adding: username};
    this.http.post(environment.urlBack + 'addFriend', data).subscribe(response => {
      this.retour = response;
    });
  };

}
