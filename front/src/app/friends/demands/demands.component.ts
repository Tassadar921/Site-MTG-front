import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../shared/services/http.service';

@Component({
  selector: 'app-demands',
  templateUrl: './demands.component.html',
  styleUrls: ['./demands.component.scss'],
})
export class DemandsComponent implements OnInit {

  public output;
  public demands;

  private retour;

  constructor(
    private httpService: HttpService,
  ) {}

  async ngOnInit() {
    this.demands = await this.httpService.getUserDemandsReceived();
  }

  addFriend=(username)=>{
    if(this.removeDemand(username)) {
      this.output = 'Something went wrong: retry later';
    }else{
      this.retour = this.httpService.addFriend(username);
    }
  };

  removeDemand=(username)=>{
    this.retour = this.httpService.removeDemandReceived(username);
    this.removeFromDemands(username);
    return this.retour === 'done';
  };

  removeFromDemands=(username)=>{
    for(let i=0; i<this.demands.length; i++){
      if(this.demands[i]===username){
        this.demands.splice(i,1);
        i=this.demands.length;
      }
    }
  };
}
