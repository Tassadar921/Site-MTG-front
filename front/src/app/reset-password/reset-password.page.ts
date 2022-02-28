import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  public username;
  public mail;
  public password;
  public confPassword;

  public output='';
  public showPassword=1;

  private retour;
  private token;
  private userId;

  constructor(
    private getVarInURL: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.getVarInURL.queryParams.subscribe(params => {
      this.token=params.token;
      this.username=params.name;
      this.mail=params.mail;
      this.password=params.password;
    });
    const data={name: this.username};
    this.http.post(environment.urlBack + '', '').pipe().subscribe(response =>{});
    this.http.post(environment.urlBack + 'getUserIdByUsername', data).pipe().subscribe(response =>{
      this.retour=response;
      this.output=this.retour.message;
      this.userId=this.retour.id;
      console.log(this.userId);
    });
  }

  showPass=()=>{
    if(this.showPassword){
      this.showPassword=0;
    }else{
      this.showPassword=1;
    }
  };

  submitReset=()=>{
    if(!this.password || !this.confPassword){
      this.output='Passwords required';
    }else{
      if(this.password!==this.confPassword){
        this.output='Passwords must be the same ones';
      }else{
        if(this.password===this.confPassword){
          const data={
            id: this.userId,
            password: this.password
          };
          this.http.post(environment.urlBack + 'resetPassword', data).pipe().subscribe(response =>{
            this.retour=response;
            this.output=this.retour.message;
          });
        }
      }
    }
  };

  updateReset=(e)=>{
    if(e.key==='Enter'){
      this.submitReset();
    }
  };

  toLogin=()=>{
    this.router.navigateByUrl('/home');
  };

}
