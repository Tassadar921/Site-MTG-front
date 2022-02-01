import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVarsService {

  private connected=1;
  private nickname='Tassadar';

  constructor() { }

  getConnected=()=>this.connected;
  setConnected=(replace)=>this.connected=replace;

  getNickname=()=>this.nickname;
  setNickname=(replace)=>this.nickname=replace;

}
