import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../shared/services/login.service';
import {HttpService} from '../../shared/services/http.service';
import {ActionSheetController} from '@ionic/angular';

@Component({
  selector: 'app-see-friends',
  templateUrl: './see-friends.component.html',
  styleUrls: ['./see-friends.component.scss'],
})
export class SeeFriendsComponent implements OnInit {

  public friends = [];
  public displayFriend = [];
  public output;
  public count = 0;
  public filter = '';

  private users = [];
  private p;

  constructor(
    private loginServ: LoginService,
    private httpService: HttpService,
    private actionSheetController: ActionSheetController,
  ) {
  }

  async ngOnInit() {
    this.p = this.loginServ.setPlatform();
    this.loginServ.refresh();
    this.users = await this.httpService.getUserListExceptOne();
    await this.displayFriendsFunction(0, 0, '');
    this.friends = await this.httpService.getUserFriends();
  }

  nextPage = async () => {
    let start = this.p * this.count;
    if (this.p * this.count + 2 < this.friends.length) {
      this.count++;
      start = this.p * this.count;
    }
    await this.displayFriendsFunction(this.count, start, this.filter);
  };

  previousPage = async () => {
    if (this.count !== 0) {
      this.count--;
    }
    const start = this.p * this.count;
    await this.displayFriendsFunction(this.count, start, this.filter);
  };

  search = async (n, start, filter) => {
    console.log('search');
    this.count = 0;
    await this.displayFriendsFunction(n, start, filter);
  };

  displayFriendsFunction = async (n, start, filter) => {

    // console.log('filter : ', filter);
    // console.log(this.filter);
    this.friends = await this.httpService.getUserFriends();
    this.users = await this.httpService.getUserListExceptOne();

    let end;

    this.friends.sort();
    this.displayFriend = [];

    if (start < this.friends.length) {
      if (this.friends.length > 11 * n + this.p) {
        end = 3 * n + this.p;
      } else {
        end = this.friends.length;
      }
      console.log('start : ', start);
      console.log('end : ', end);
      for (let i = start; i < end; i++) {
        for (let k = 0; k < this.users.length; k++) {
          console.log(this.friends[i]);
          if (this.friends[i].includes(filter) || this.friends[i].includes(filter.toUpperCase())) {
            if (this.users[k].username === this.friends[i]) {
              this.displayFriend.unshift({friend: this.friends[i], lastConnected: this.users[k].lastConnected});
              k = this.users.length;
            }
          } else {
            end += 1;
          }
        }
      }
    }
    console.log(this.displayFriend);
  };

  deleteFromFriends = async (username) => {
    const actionSheet = await this.actionSheetController.create({
      header: 'Confirm friendship deletion with ' + username + ' ?',
      buttons: [{
        text: 'Yes',
        icon: 'checkmark',
        handler: async () => {
          await this.httpService.deleteFriendship(username);
          await this.displayFriendsFunction(0, 0, this.filter);
          this.count = 0;
        }
      }, {
        text: 'No',
        icon: 'close',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  };

  invite = (username) => {
    //ON VERRA PLUS TARD
  };
}
