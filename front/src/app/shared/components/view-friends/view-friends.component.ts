import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {HttpService} from '../../services/http.service';
import {ActionSheetController, NavParams, ViewWillLeave, ModalController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view-friends',
  templateUrl: './view-friends.component.html',
  styleUrls: ['./view-friends.component.scss'],
})
export class ViewFriendsComponent implements OnInit, ViewWillLeave{

  public friends = [];
  public displayFriend = [];
  public output;
  public count = 0;
  public filter = '';
  public nbPages;
  public chosenFriends = ' ';

  private users = [];
  private p;
  private retour;

  constructor(
    private login: LoginService,
    private http: HttpService,
    private actionSheetController: ActionSheetController,
    public router: Router,
    private navParams: NavParams,
    private modalController: ModalController
  ) {}

  ionViewWillLeave() {
    this.http.shareDeckWith(this.navParams.get('deck'), this.chosenFriends);
  }

  async ngOnInit() {
    this.p = this.login.setPlatform();
    await this.login.refresh();
    await this.displayFriendsFunction(0, 0, '');
    if(this.router.url==='/updown-load'){
      this.retour = await this.http.getListSharedWith(this.navParams.get('deck'));
      this.chosenFriends = this.retour.output;
      if(this.chosenFriends===null){
        this.chosenFriends=' ';
      }
      console.log(this.chosenFriends);
    }
  }

  getnbPages = () => {
    if (this.friends.length) {
      return Math.ceil(this.friends.length / this.p);
    } else {
      return 1;
    }
  };

  nextPage = async () => {
    let start = this.p * this.count;
    if (this.p * this.count + this.p < this.friends.length) {
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
    this.count = 0;
    await this.displayFriendsFunction(n, start, filter);
  };

  displayFriendsFunction = async (n, start, filter) => {
    this.friends = await this.http.getUserFriends();
    this.users = await this.http.getUserListExceptOne();

    let end;

    this.displayFriend = [];

    if (start < this.friends.length) {
      if (this.friends.length > start + this.p) {
        end = start + this.p;
      } else {
        end = this.friends.length;
      }

      for (let i = start; i < end; i++) {
        if (this.friends[i]) {
          if (this.friends[i].toUpperCase().includes(filter.toUpperCase())) {
            for (let k = 0; k < this.users.length; k++) {
              if (this.users[k].username === this.friends[i]) {
                this.displayFriend.push({friend: this.friends[i], lastConnected: this.users[k].lastConnected});
                k = this.users.length;
              }
            }
          }
        }
      }
    }
    this.nbPages = this.getnbPages();
  };

  deleteFromFriends = async (username) => {
    const actionSheet = await this.actionSheetController.create({
      header: 'Delete ' + username + ' from friends ?',
      buttons: [{
        text: 'Yes',
        icon: 'checkmark',
        handler: async () => {
          this.retour = await this.http.deleteFriendship(username);
          this.output = this.retour.output;
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
    console.log('on va inviter ' + username.friend);
    //ON VERRA PLUS TARD
  };

  closeActionSheet = () => this.modalController.dismiss();

  addToChosenFriends = (username) => this.chosenFriends+=username + ' ';

  deleteFromChosenFriends = (username) => this.chosenFriends = this.chosenFriends.replace(username, '');
}
