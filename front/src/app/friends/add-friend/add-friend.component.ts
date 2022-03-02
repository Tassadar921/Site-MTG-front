import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginService} from '../../shared/services/login.service';
import {HttpService} from '../../shared/services/http.service';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss'],
})
export class AddFriendComponent implements OnInit {

  public displayUsers = [];
  public output;

  private users = [];
  private friends = [];
  private demandsSent = [];
  private demandsReceived = [];
  private count = 0;
  private p;

  constructor(
    private http: HttpClient,
    private loginServ: LoginService,
    private httpService: HttpService,
  ) {}

  async ngOnInit() {
    this.p=this.loginServ.setPlatform();
    await this.displayUsersFunction(this.count);
    this.loginServ.refresh();
  }

  displayUsersFunction = async (n) => {

    this.friends = await this.httpService.getUserFriends();
    this.users = await this.httpService.getUserListExceptOne();
    this.demandsSent = await this.httpService.getUserDemandsSent();
    this.demandsReceived = await this.httpService.getUserDemandsReceived();

    let friends;
    let end;
    let sent;
    let received;
    const start = 3*n;

    this.displayUsers = [];

    if(this.users.length>11*n+2) {
      end = 3 * n + this.p;
    }else{
      end = this.users.length;
    }
    for (let i = start; i < end; i++) {
      friends = false;
      sent = false;
      received = false;
      for(let k = 0; k<this.friends.length; k++){
        if(this.friends[k]===this.users[i].username){
          friends = true;
          k=this.friends.length;
        }
      }
      for(let k = 0; k<this.demandsSent.length; k++){
        if(this.demandsSent[k]===this.users[i].username){
          sent = true;
          k=this.demandsSent.length;
        }
      }
      for(let k = 0; k<this.demandsReceived.length; k++){
        if(this.demandsReceived[k]===this.users[i].username){
          received = true;
          k=this.demandsReceived.length;
        }
      }
      if(!friends && !sent && !received){
        this.displayUsers.unshift(this.users[i]);
      }
    }
    this.displayUsers.sort();
    this.count++;
  };

  askFriend = async (username) =>{

    this.output = await this.httpService.askFriend(username);
    await this.displayUsersFunction(this.count);
  };

}
