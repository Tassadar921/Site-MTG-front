import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {GlobalVarsService} from '../../services/global-vars.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {

  constructor(
    private router: Router,
    public glob: GlobalVarsService,
  ) { }

  ngOnInit() {
    if(this.glob.getConnected()===0){
      this.router.navigateByUrl('/home');
    }
  }

  redirect = (direction) =>{
    this.glob.setNickname('');
    this.glob.setConnected(false);
    this.router.navigateByUrl('/' + direction);
  };

}
