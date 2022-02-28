import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginService} from '../../shared/services/login.service';
import {GlobalVarsService} from '../../shared/services/global-vars.service';
import {environment} from '../../../environments/environment';
import {lastValueFrom} from 'rxjs';
import {HttpService} from '../../shared/services/http.service';
import {Observable} from 'rxjs';
import {defer, from} from 'rxjs';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss'],
})
export class AddFriendComponent implements OnInit {

  public displayUsers = [];
  public output;

  private retour;
  private users = [];
  private friends = [];
  private demandsSent = [];
  private demandsReceived = [];
  private count = 0;

  constructor(
    private http: HttpClient,
    private loginServ: LoginService,
    private glob: GlobalVarsService,
    private httpService: HttpService,
  ) {}

  async ngOnInit() {
    await this.displayUsersFunction(this.count);
    this.loginServ.refresh();

    console.log('display : ', this.displayUsers);
  }

  displayUsersFunction = async (n) => { //////////////////// A DEBUG ASYNC ///////////////////////////////////////////

    const data = {name: this.glob.getNickname()};

    // this.http.post(environment.urlBack + 'getUserFriends', data).subscribe(res => {
    //   this.retour = res;
    //   this.friends = this.retour.links.sort();
    //   console.log('test');
    // });

    console.log('avant');
    const test = new Promise((resolve, reject) => {
      resolve(
        this.http.post(environment.urlBack + 'getUserFriends', data).subscribe(res => {
          this.retour = res;
          console.log('res : ', res); //return this.retour.links en async
          return this.retour.links;
          })
      );
      console.log('bouh');
    });

    test.then((value)=>{
      console.log('test : ', value);
    });
    console.log('après');

    this.http.post(environment.urlBack + 'getUserListExceptOne', data).subscribe(res => {
      this.retour = res;
      this.users = this.retour.output.sort();
      console.log('ici');
    });

    this.http.post(environment.urlBack + 'getUserDemandsSent', data).subscribe(res => {
      this.retour = res;
      this.demandsSent = this.retour.demands.sort();
    });

    this.http.post(environment.urlBack + 'getUserDemandsReceived', data).subscribe(res => {
      this.retour = res;
      this.demandsReceived = this.retour.demands.sort();
    });

    let friends;
    let end;
    let sent;
    let received;
    const start = 3*n;

    this.users.sort();
    this.displayUsers = [];

    console.log('userlist : ', this.users);
    if(this.users.length>11*n+2) {
      end = 3 * n + 2;
    }else{
      end = this.users.length;
    }
    console.log('start : ', start);
    console.log('end : ', end);
    for (let i = start; i < end; i++) {
      friends = false;
      sent = false;
      received = false;
      for(let k = 0; k<this.friends.length; k++){
        if(this.friends[k]===this.users[i]){
          friends = true;
          k=this.friends.length;
        }
      }
      for(let k = 0; k<this.demandsSent.length; k++){
        if(this.demandsSent[k]===this.users[i]){
          sent = true;
          k=this.demandsSent.length;
        }
      }
      for(let k = 0; k<this.demandsSent.length; k++){
        if(this.demandsSent[k]===this.users[i]){
          received = true;
          k=this.demandsSent.length;
        }
      }
      this.displayUsers[i] = {user: this.users[i], friend: friends, send: sent, receive: received};
    }
    this.count++;
  };

  askFriend = (username) =>{
    const data = {from: this.glob.getNickname(), to: username};

    this.http.post(environment.urlBack + 'askFriend', data).subscribe(response => {
      this.retour = response;
      this.output=this.retour.message;
      this.displayUsersFunction(this.count);
    });
  };

}
