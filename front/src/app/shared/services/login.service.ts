import { Injectable } from '@angular/core';
import {StorageService} from './storage.service';
import {Platform} from '@ionic/angular';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public retour;

  constructor(
    private storage: StorageService,
    private platform: Platform,
    private http: HttpService,
  ) {}

  refresh = async () => { //pour chaque changement de page, update de lastconnected pour la session en cours
    await this.http.lastConnected(await this.storage.getNickname());
  };

  setPlatform=()=>{ //nb d'éléments affichés quand on a un système de pages
      if (this.platform.is('mobile') || this.platform.is('mobileweb')) {
        return 10;
      } else {
        return 20;
    }
  };

  getDevice=()=>{
    if(this.platform.is('mobile') || this.platform.is('mobileweb')){
      return 'small';
    }else{
      return 'large';
    }
  };
}
