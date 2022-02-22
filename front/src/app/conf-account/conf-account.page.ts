import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { Clipboard } from '@angular/cdk/clipboard';
import {GlobalVarsService} from '../shared/services/global-vars.service';

@Component({
  selector: 'app-conf-account',
  templateUrl: './conf-account.page.html',
  styleUrls: ['./conf-account.page.scss'],
})
export class ConfAccountPage implements OnInit {

  public output;
  public redirect=false;

  private token;
  private username;
  private mail;
  private password;

  private retour;

  constructor(
    private getVarInURL: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private clipboard: Clipboard,
    private glob: GlobalVarsService,
  ) { }

  ngOnInit() {
    this.getVarInURL.queryParams.subscribe(params => {
      this.token=params.token;
      this.username=params.name;
      this.mail=params.mail;
      this.password=params.password;
    });

    const data = {
      name: this.username,
      password: this.password,
      mail: this.mail
    };

    const token = {
      token: this.token,
      mail: this.mail,
    };

    this.http.post(environment.urlBack + 'checkToken', token).pipe().subscribe(response=>{
      this.retour=response;
      this.output=this.retour.message;
      if(this.retour.output===1){
        this.http.post(environment.urlBack + 'signUp', data).pipe().subscribe(resp=>{
          this.retour=resp;
          this.output=this.retour.message;
          if(this.retour.return===true) {
            this.glob.setNickname(this.username);
            this.redirect=true;
            this.router.navigateByUrl('/welcome');
          }
        });
      }
    });
  }

  forceRedirect=()=>{
    this.router.navigateByUrl('/welcome');
  };

  toLogin=()=>{
    this.router.navigateByUrl('/home');
  };

  copy=()=>{
    this.clipboard.copy('noreply.tassadar.ovh@gmail.com');
    this.output='Email adress copied to clipboard !';
  };

}
