import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class GlobalVarsService {

  private retour;

  constructor() {}

  getNickname = async () => {
    this.retour = await Storage.get({key: 'username'});
    return this.retour.value;
  };

  setNickname = async (replace) => await Storage.set({key: 'username', value: replace});
}
