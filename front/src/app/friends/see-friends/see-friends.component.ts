import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../shared/services/login.service';
import {HttpService} from '../../shared/services/http.service';

@Component({
  selector: 'app-see-friends',
  templateUrl: './see-friends.component.html',
  styleUrls: ['./see-friends.component.scss'],
})
export class SeeFriendsComponent implements OnInit {

  public displayFriend = [];
  public output;
  public count = 0;

  private friends = [];
  private users = [];

  constructor(
    private loginServ: LoginService,
    private httpService: HttpService,
  ) {}

  async ngOnInit() {
    this.loginServ.refresh();
    this.displayFriendsFunction(this.count);
  }

  displayFriendsFunction = async (n) =>{

    this.friends=await this.httpService.getUserFriends();
    console.log(this.friends);

    this.users=await this.httpService.getUserListExceptOne();

    let end;
    const start = 3*n;

    this.friends.sort();
    this.displayFriend = [];

    if(this.friends.length>11*n+2) {
      end = 3 * n + 2;
    }else{
      end = this.friends.length;
    }
    for (let i = start; i < end; i++) {
      for(let k=0; k<this.users.length;k++) {
        if(this.users[k].username === this.friends[i]) {
          this.displayFriend.unshift({friend: this.friends[i], lastConnected: this.users[k].lastConnected});
          k=this.users.length;
        }
      }
    }
    this.count++;
  };

  invite=(username)=>{
    //ON VERRA PLUS TARD
  };


}
