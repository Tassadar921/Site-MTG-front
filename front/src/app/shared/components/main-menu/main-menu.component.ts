import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {GlobalVarsService} from '../../services/global-vars.service';
import * as moment from 'moment';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {

  public today;
  public hour;

  constructor(
    private router: Router,
    public glob: GlobalVarsService,
  ) {
    setInterval(this.refreshTime, 2000);
  }

  ngOnInit() {
    if(this.glob.getConnected()===false){
      this.router.navigateByUrl('/home');
    }
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
    }
  };

  redirect = (direction) =>{
    if(direction==='home') {
      this.glob.setNickname('');
      this.glob.switchConnected();
    }
    this.router.navigateByUrl('/' + direction);
  };
}
