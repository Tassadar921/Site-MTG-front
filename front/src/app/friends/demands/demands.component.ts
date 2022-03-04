import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../shared/services/http.service';
import {GlobalVarsService} from '../../shared/services/global-vars.service';

@Component({
  selector: 'app-demands',
  templateUrl: './demands.component.html',
  styleUrls: ['./demands.component.scss'],
})
export class DemandsComponent implements OnInit {

  public output;
  public demands;
  public demandsLength;

  private retour;

  constructor(
    private httpService: HttpService,
    private glob: GlobalVarsService,
  ) {}

  async ngOnInit() {
    this.demands = await this.httpService.getUserDemandsReceived();
    this.retour = await this.httpService.getUserDemandsReceived();
    this.demandsLength = this.retour.length;
  }

  addFriend= async (username)=>{
    if(await this.removeDemand(username)) {
      this.output = 'Something went wrong: retry later';
    }else{
      this.retour = await this.httpService.addFriend(username);
    }
  };

  removeDemand = async (username)=>{
    this.retour = await this.httpService.deleteDemand(username, this.glob.getNickname());
    console.log(this.retour);
    this.demands = await this.httpService.getUserDemandsReceived();
    this.demandsLength = this.demands.length;
    return this.retour === 'done';
  };
}
