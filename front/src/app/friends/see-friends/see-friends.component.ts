import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import{HttpClient} from "@angular/common/http";
import {GlobalVarsService} from "../../shared/services/global-vars.service";
import {LoginService} from "../../shared/services/login.service";

@Component({
  selector: 'app-see-friends',
  templateUrl: './see-friends.component.html',
  styleUrls: ['./see-friends.component.scss'],
})
export class SeeFriendsComponent implements OnInit {

  public displayUsers = [];
  public output;

  private retour;
  private users = [];
  private friends = [];

  constructor(
    private http: HttpClient,
    private glob: GlobalVarsService,
    private loginServ: LoginService,
  ) {}

  ngOnInit() {
    const data = {name: this.glob.getNickname()};

    this.http.post(environment.urlBack + 'getUserListExceptOne', data).subscribe(res => {
      this.loginServ.refresh();
      this.retour = res;
      this.users = this.retour.output;
      this.displayUsersFunction(0);
    });
  }

  displayUsersFunction = (n) =>{
    let friends;
    let end;
    const start = 3*n;;

    this.users.sort();
    this.displayUsers = [];

    if(this.users.length>11*n+2) {
      end = 3 * n + 2;
    }else{
      end = this.users.length;
    }
    for (let i = start; i < end; i++) {
      friends = false;
      for(let k = 0; k<this.friends.length; k++){
        if(this.friends[k]===this.users[i]){
          friends = true;
          k=this.friends.length;
        }
      }
      this.displayUsers[i] = {user: this.users[i], friend: friends};
    }
  };


}
