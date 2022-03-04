import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginService} from '../../shared/services/login.service';
import {HttpService} from '../../shared/services/http.service';
import {GlobalVarsService} from '../../shared/services/global-vars.service';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss'],
})
export class AddFriendComponent implements OnInit {

  public displayUsers = [];
  public output;
  public nbPages;
  public filter = '';

  // private friends = [];
  private count = 0;
  private p;
  private notFriends = [];
  private filteredArray = [];

  constructor(
    private http: HttpClient,
    private loginServ: LoginService,
    private httpService: HttpService,
    private glob: GlobalVarsService,
  ) {
  }

  async ngOnInit() {
    this.p = this.loginServ.setPlatform('add');
    this.nbPages = this.getnbPages();
    await this.fillNotFriend(0, 0);
    this.loginServ.refresh();
  }

  getnbPages = () => {
    if (this.notFriends.length) {
      return Math.ceil(this.notFriends.length / this.p);
    } else {
      return 1;
    }
  };

  nextPage = async () => {
    let start = this.p * this.count;
    if (this.p * this.count + this.p < this.notFriends.length) {
      this.count++;
      start = this.p * this.count;
    }
    await this.fillNotFriend(this.count, start);
  };

  previousPage = async () => {
    if (this.count !== 0) {
      this.count--;
    }
    const start = this.p * this.count;
    await this.fillNotFriend(this.count, start);
  };

  search = async (n, start, filter) => {
    this.count = 0;
    await this.fillNotFriend(n, start);
  };

  fillNotFriend = async (n, start) => {

    const friends = await this.httpService.getUserFriends();
    const users = await this.httpService.getUserListExceptOne();
    const demandsSent = await this.httpService.getUserDemandsSent();
    const demandsReceived = await this.httpService.getUserDemandsReceived();

    let friend;
    let sent;
    let received;
    this.notFriends = [];

    users.sort();

    for (let i = 0; i < users.length; i++) {
      friend = false;
      sent = false;
      received = false;
      for (let k = 0; k < friends.length; k++) {
        if (friends[k] === users[i].username) {
          friend = true;
          k = friends.length;
        }
      }
      for (let k = 0; k < demandsSent.length; k++) {
        if (demandsSent[k] === users[i].username) {
          sent = true;
          k = demandsSent.length;
        }
      }
      for (let k = 0; k < demandsReceived.length; k++) {
        if (demandsReceived[k] === users[i].username) {
          received = true;
          k = demandsReceived.length;
        }
      }
      if (!friend) {
        this.notFriends.push({user: users[i], demandSent: sent, demandReceived: received});
      }
    }
    await this.displayUsersFunction(n, start, this.filter);
  };

  displayUsersFunction = async (n, start, filter) => {
    let end;
    this.displayUsers = [];

    if (start < this.notFriends.length) {
      if (this.notFriends.length > start + this.p) {
        end = start + this.p;
      } else {
        end = this.notFriends.length;
      }

      for (let i = start; i < end; i++) {
        if (this.notFriends[i].user.username.toUpperCase().includes(filter.toUpperCase())) {
          this.displayUsers.push(
            {
              username: this.notFriends[i].user.username,
              lastConnected: this.notFriends[i].user.lastConnected,
              sent: this.notFriends[i].demandSent,
              received: this.notFriends[i].demandReceived
            });
        }
      }
    }
    this.nbPages = this.getnbPages();
  };

  askFriend = async (username) => {
    this.output = await this.httpService.askFriend(username);
    await this.fillNotFriend(this.count, this.p * this.count);
  };

  annulDemand = async (username) => {
    this.output = await this.httpService.deleteDemand(this.glob.getNickname(), username);
    await this.fillNotFriend(this.count, this.p * this.count);
  };

}
