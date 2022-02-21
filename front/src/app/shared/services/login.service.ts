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
    this.http.post(environment.urlBack + '', '').subscribe(response => {
      this.retour = response;
    });

    const data = {
      name: this.glob.getNickname(),
    };

    this.http.post(environment.urlBack + 'lastConnected', data).subscribe(response => {
      this.retour = response;
    });
  };

  getRetour=()=>this.retour;
}
