import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalVarsService} from './global-vars.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public retour;

  constructor(
    private http: HttpClient,
    private glob: GlobalVarsService,
  ) {
  }

  refresh = () => {

    const data = {name: this.glob.getNickname()};

    this.http.post<string>(environment.urlBack + 'lastConnected', data).toPromise().then(response => {
      this.retour = response;
    });
  };
}
