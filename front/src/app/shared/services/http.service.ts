import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {GlobalVarsService} from './global-vars.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

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
    await this.http.post(environment.urlBack + 'getUserFriends', data).subscribe(res => {
      this.retour = res;
      console.log('res : ', res); //return this.retour.links en async
      return this.retour.links;
    });
  };
}
