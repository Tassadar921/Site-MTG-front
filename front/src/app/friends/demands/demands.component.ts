import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Clipboard} from '@angular/cdk/clipboard';
import {GlobalVarsService} from '../../shared/services/global-vars.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-demands',
  templateUrl: './demands.component.html',
  styleUrls: ['./demands.component.scss'],
})
export class DemandsComponent implements OnInit {

  public output;
  public demands;

  private from;
  private retour;

  constructor(
    private getVarInURL: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private clipboard: Clipboard,
    private glob: GlobalVarsService,
  ) { }

  ngOnInit() {
    const data = {name: this.glob.getNickname()};
    this.http.post(environment.urlBack + 'getUserDemandsReceived', data).subscribe(response => {
      this.retour = response;
      this.demands = this.retour.demands;
    });
  }

  addFriend=(username)=>{
    const data = {user1: this.glob.getNickname(), user2: username};
    this.http.post(environment.urlBack + 'addFriend', data).subscribe(response => {
      this.retour = response;
      this.output = this.retour.message;
    });
  };

}
