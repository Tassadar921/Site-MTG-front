import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../shared/services/login.service';
import {HttpService} from '../../shared/services/http.service';
import {ActionSheetController} from '@ionic/angular';

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
  private p;

  constructor(
    private loginServ: LoginService,
    private httpService: HttpService,
    private actionSheetController: ActionSheetController,
  ) {}

  async ngOnInit() {
    this.p=this.loginServ.setPlatform();
    this.loginServ.refresh();
    await this.displayFriendsFunction(0);
  }

  nextPage = async () => {
    await this.displayFriendsFunction(this.count);
    this.count++;
  };

  previousPage = async () => {
    this.count--;
    await this.displayFriendsFunction(this.count);
  };

  displayFriendsFunction = async (n) => {

    this.friends=await this.httpService.getUserFriends();
    this.users=await this.httpService.getUserListExceptOne();

    console.log(this.friends);

    let end;
    const start = 3*n;

    this.friends.sort();
    this.displayFriend = [];

    if(start<this.friends.length) {
      console.log('a');
      console.log(this.friends.length);
      console.log(11 * n + this.p);
      if (this.friends.length > 11 * n + this.p) {
        end = 3 * n + this.p;
      } else {
        end = this.friends.length;
      }
      console.log('start : ', start);
      console.log('end : ', end);
      for (let i = start; i < end; i++) {
        for (let k = 0; k < this.users.length; k++) {
          if (this.users[k].username === this.friends[i]) {
            this.displayFriend.unshift({friend: this.friends[i], lastConnected: this.users[k].lastConnected});
            k = this.users.length;
          }
        }
      }
    }
    console.log(this.displayFriend);
  };

  deleteFromFriends = async (username) => {
    const actionSheet = await this.actionSheetController.create({
      header: 'Confirm friendship deletion with ' + username + ' ?',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Yes',
        icon: 'checkmark',
        handler: async () => {
          await this.httpService.deleteFriendship(username);
          await this.displayFriendsFunction(0);
          this.count = 0;
        }
      },{
        text: 'No',
        icon: 'close',
        handler: () => {}
      }]
    });
    await actionSheet.present();
};

  invite=(username)=>{
    //ON VERRA PLUS TARD
  };


}
