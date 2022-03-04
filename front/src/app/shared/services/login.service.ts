import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalVarsService} from './global-vars.service';
import {environment} from '../../../environments/environment';
import {Platform} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public retour;

  constructor(
    private http: HttpClient,
    private glob: GlobalVarsService,
    private platform: Platform,
  ) {}

  refresh = () => {
    const data = {name: this.glob.getNickname()};

    this.http.post<string>(environment.urlBack + 'lastConnected', data).toPromise().then(response => {
      this.retour = response;
    });
  };

  setPlatform=(ref)=>{
      if (this.platform.is('mobile') || this.platform.is('mobileweb')) {
        return 2;
      } else {
        if(ref === 'see') {
        return 4;
      }else{
          if(ref ==='add'){
            return 3;
          }
      }
    }
  };
}
