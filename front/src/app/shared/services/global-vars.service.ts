import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVarsService {

  private connected=0;
  private nickname='';

  constructor() { }

  getConnected=()=>this.connected;
  setConnected=(replace)=>this.connected=replace;

  getNickname=()=>this.nickname;
  setNickname=(replace)=>this.nickname=replace;

}
