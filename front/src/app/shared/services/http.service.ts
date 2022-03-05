import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {GlobalVarsService} from './global-vars.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private retour;

  constructor(
    private glob: GlobalVarsService,
    private http: HttpClient,
  ) {
  }

  ////////////////////////////// MAILS //////////////////////////////

  checkToken = async (tok, email) => {
    const token = {
      token: tok,
      mail: email,
    };
    await this.http.post<string>(environment.urlBack + 'checkToken', token).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour;
  };

  mailToken = async (maill, namee, passwordd) => {
    const data = {
      mail: maill,
      name: namee,
      password: passwordd
    };
    await this.http.post<string>(environment.urlBack + 'mailToken', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour;
  };

  sendResetPassword = async (email) => {
    const data = {mail: email};
    await this.http.post<string>(environment.urlBack + 'sendResetPassword', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour.message;
  };

  ////////////////////////////// ACCOUNTS //////////////////////////////
  signUp = async (username, passwordd, email) => {
    const data = {
      name: username,
      password: passwordd,
      mail: email
    };
    await this.http.post<string>(environment.urlBack + 'signUp', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour;
  };

  login = async (namee, passwordd) => {
    const data = {
      name: namee,
      password: passwordd,
    };
    await this.http.post<string>(environment.urlBack + 'login', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour;
  };

  resetPassword = async (userId, passwordd) => {
    const data = {
      id: userId,
      password: passwordd
    };
    await this.http.post<string>(environment.urlBack + 'resetPassword', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour;
  };

  getUserIdByUsername = async (username) => {
    const data = {name: username};
    await this.http.post<string>(environment.urlBack + 'getUserIdByUsername', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour;
  };

  getUserDemandsReceivedLength = async () => {
    const data = {name: this.glob.getNickname()};
    await this.http.post<Array<string>>(environment.urlBack + 'getUserDemandsReceived', data).toPromise().then(res => {
      this.retour = res;
    });
    return this.retour.demands.length;
  };

  getUserFriends = async () => {
    const data = {name: this.glob.getNickname()};
    await this.http.post<Array<string>>(environment.urlBack + 'getUserFriends', data).toPromise().then(res => {
      this.retour = res;
    });
    return this.retour.links;
  };

  getUserListExceptOne = async () => {
    const data = {name: this.glob.getNickname()};
    await this.http.post<Array<string>>(environment.urlBack + 'getUserListExceptOne', data).toPromise().then(res => {
      this.retour = res;
    });
    return this.retour.output;
  };

  getUserDemandsSent = async () => {
    const data = {name: this.glob.getNickname()};
    await this.http.post<Array<string>>(environment.urlBack + 'getUserDemandsSent', data).toPromise().then(res => {
      this.retour = res;
    });
    return this.retour.demands;
  };

  getUserDemandsReceived = async () => {
    const data = {name: this.glob.getNickname()};
    await this.http.post<Array<string>>(environment.urlBack + 'getUserDemandsReceived', data).toPromise().then(res => {
      this.retour = res;
    });
    return this.retour.demands;
  };

  askFriend = async (username) => {
    const data = {from: this.glob.getNickname(), to: username};
    await this.http.post<Array<string>>(environment.urlBack + 'askFriend', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour.message;
  };

  addFriend = async (username) => {
    const data = {user1: this.glob.getNickname(), user2: username};
    await this.http.post<string>(environment.urlBack + 'addFriend', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour.message;
  };

  deleteFriendship = async (username) => {
    const data = {username1: username, username2: this.glob.getNickname()};
    await this.http.post<string>(environment.urlBack + 'deleteFriendship', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour.message;
  };

  deleteDemand = async (send, receive) => {
    const data = {sender: send, receiver: receive};
    await this.http.post<string>(environment.urlBack + 'deleteDemand', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour.message;
  };
}
