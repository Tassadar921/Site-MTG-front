import { Injectable } from '@angular/core';
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
    this.http.post(environment.urlBack + 'askFriend', data).subscribe(response => {
      this.retour = response;
    });
    return this.retour.message;
  };
}
