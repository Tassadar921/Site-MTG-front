import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {GlobalVarsService} from './global-vars.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public demandsReceivedLength;

  private retour;

  constructor(
    private glob: GlobalVarsService,
    private http: HttpClient,
  ) {}

  getTest = () => this.demandsReceivedLength;

  getUserDemandsReceivedLength = async () => {
    const data = {name: this.glob.getNickname()};
    await this.http.post<Array<string>>(environment.urlBack + 'getUserDemandsReceived', data).toPromise().then(res => {
      this.retour = res;
      this.demandsReceivedLength=this.retour.demands.length;
    });
    return this.demandsReceivedLength;
  };

  getUserFriends = async () => {
    const data = {name: this.glob.getNickname()};
    await this.http.post<Array<string>>(environment.urlBack + 'getUserFriends', data).toPromise().then(res => {
      this.retour = res;
    });
    return this.retour.links.sort();
  };

  getUserListExceptOne = async () => {
    const data = {name: this.glob.getNickname()};
    await this.http.post<Array<string>>(environment.urlBack + 'getUserListExceptOne', data).toPromise().then(res => {
      this.retour = res;
    });
    return this.retour.output.sort();
  };

  getUserDemandsSent = async () => {
    const data = {name: this.glob.getNickname()};
    await this.http.post<Array<string>>(environment.urlBack + 'getUserDemandsSent', data).toPromise().then(res => {
      this.retour = res;
    });
    return this.retour.demands.sort();
  };

  getUserDemandsReceived = async () => {
    const data = {name: this.glob.getNickname()};
    await this.http.post<Array<string>>(environment.urlBack + 'getUserDemandsReceived', data).toPromise().then(res => {
      this.retour = res;
    });
    return this.retour.demands.sort();
  };

  askFriend = async (username) => {
    const data = {from: this.glob.getNickname(), to: username};
    await this.http.post<Array<string>>(environment.urlBack + 'askFriend', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour.message;
  };

  removeDemandReceived = async (username) => {
    const data = {from: username, to: this.glob.getNickname()};
    await this.http.post<Array<string>>(environment.urlBack + 'removeDemandReceived', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour.output;
  };

  addFriend = async (username) => {
    const data = {user1: this.glob.getNickname(), user2: username};
    await this.http.post<string>(environment.urlBack + 'addFriend', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour.message;
  };
}
