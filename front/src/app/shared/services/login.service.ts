import { Injectable } from '@angular/core';
import {GlobalVarsService} from './global-vars.service';
import {Platform} from '@ionic/angular';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public retour;

  constructor(
    private glob: GlobalVarsService,
    private platform: Platform,
    private httpService: HttpService,
  ) {}

  refresh = async () => {
    await this.httpService.lastConnected(await this.glob.getNickname());
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
