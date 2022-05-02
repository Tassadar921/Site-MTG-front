import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StorageService} from '../../../services/storage.service';
import * as moment from 'moment';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {

  public hour;
  public name;

  constructor(
    private router: Router,
    public storage: StorageService,
  ) {
    setInterval(this.refreshTime, 2000);
  }

  async ngOnInit() {
    if(!await this.storage.getNickname()){
      await this.router.navigateByUrl('/home');
    }
    this.name = await this.storage.getNickname();
    this.refreshTime();
  }

  refreshTime=() =>{
    if (moment().format('h:mm:ss a').includes('pm')) {
      let cut;
      for (let i = 0; i < moment().format('h:mm:ss a').length; i++) {
        if (moment().format('h:mm:ss a')[i] === ':') {
          cut = i;
          i = moment().format('h:mm:ss a').length;
        }
      }
      this.hour = (Number(moment().format('h:mm:ss a').slice(0, cut)) + 12)
        .toString() + moment().format('h:mm:ss a')
        .slice(cut, moment().format('h:mm:ss a').length - 6);
      if(this.hour[0]==='2' && this.hour[1]==='4'){
        this.hour = '12' + this.hour.slice(2,this.hour.length);
      }
    } else {
      this.hour = moment().format('h:mm:ss a')
        .slice(0, moment().format('h:mm:ss a').length - 6);
      if(this.hour[0]==='1' && this.hour[1]==='2'){
        this.hour = '00' + this.hour.slice(2,this.hour.length);
      }
    }
  };

  redirect = async (direction) =>{
    if(direction==='home') {
      await this.storage.disconnect();
    }
    await this.router.navigateByUrl('/' + direction);
  };
}
