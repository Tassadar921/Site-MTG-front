import { Component,OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalVarsService} from '../shared/services/global-vars.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

  public iname='';
  public ipassword='';
  public confPassword='';
  public imail='';
  public token;


  public cname='';
  public cpassword='';
  public cpass='';

  public showPassword = 1;

  public recupMail='';

  public displayToken=0;
  public output='';

  public exists = 1;

  private retour;

  //private url = 'http://loginmtg.tassadar.ovh:8080/';
  private url = 'http://localhost:8080/';

  constructor(
    private http: HttpClient,
    private glob: GlobalVarsService,
    private router: Router,
  ) {}

  ngOnInit() {}

  switch=(val)=>{ //toggle pour les components
    this.output='';
    this.showPassword=1;
    this.exists=val;
  };

  switchTokenDisplay=()=>{
    this.token='';
    this.displayToken=0;
  };

  signUp() {

    const data={
      mail:this.imail,
      name: this.iname
    };

    this.output='';

    if (this.ipassword && this.confPassword && this.ipassword===this.confPassword) {

      this.output='';

      this.http.post(this.url + 'mailToken', data).subscribe(response => {
        this.retour=response;
        this.output=this.retour.message;
        if(this.retour.output===1){
          this.displayToken=1;
        }
      });

    }else{
      if(this.ipassword && this.confPassword && this.ipassword!==this.confPassword) {
        this.output = 'Mots de passe différents';
      }else{
        if(!this.iname){
          this.output='Nom d\'utilisateur requis';
        }else{
          if(!this.ipassword){
            this.output='Mot de passe requis';
          }else{
            if(!this.confPassword){
              this.output='Confirmation du mot de passe requise';
            }else{
              if(!this.imail){
                this.output='E-mail requis';
              }
            }
          }
        }
      }
    }
  }

  submitToken(){

    const data = {
      name: this.iname,
      password: this.ipassword,
      mail: this.imail
    };

    const token = {
      token: this.token,
      mail: this.imail,
    };

    this.http.post(this.url + 'checkToken', token).pipe().subscribe(response=>{
      this.retour=response;
      this.output=this.retour.message;
      if(this.retour.output===1){
        this.http.post(this.url + 'signUp', data).pipe().subscribe(resp=>{
          this.retour=resp;
          this.output=this.retour.message;
          if(this.retour.return===true) {
            this.glob.setNickname(this.iname);
            this.glob.setConnected(1);
            this.router.navigateByUrl('/welcome');
          }
        });
      }
    });
  };

  signIn(indice, nom, pass) {
    const data = {
      name: nom,
      password: pass
    };

    if (indice === 1) {
      if (nom!=='' && pass!=='') {
        this.http.post(this.url + 'login', data).pipe().subscribe(response => {
          this.retour = response;
          this.output = this.retour.message;
          if (this.retour.co === true) {
            this.login(nom);
          }
        });
      } else {
        if (nom==='') {
          this.output = 'Nickname required';
        } else {
          if (pass==='') {
            this.output = 'Password required';
          }
        }
      }
    }
  };

  login=(name)=>{
    this.glob.setNickname(name);
    this.glob.setConnected(true);
    this.router.navigateByUrl('/welcome');
  };

  updateSignIn=(e)=>{
    if(e.key==='Enter'){
      this.signIn(1, this.cname, this.cpassword);
    }
  };

  updateSignUp=(e)=>{
    if(e.key==='Enter'){
      this.signUp();
    }
  };

  updateToken=(e)=>{
    if(e.key==='Enter'){
      this.submitToken();
    }
  };

  updateResetPassword=(e)=>{
    if(e.key==='Enter'){
      this.resendPassword();
    }
  };

  resendPassword=()=>{
    const data={mail: this.recupMail};
    this.http.post(this.url + 'resetPassword', data).pipe().subscribe(response =>{
      this.retour=response;
      this.output=this.retour.message;
    });
  };

  backToLogin=()=>{
    this.recupMail='';
    this.exists=1;
    this.output='';
  };

  sendPassword=()=>{
    this.exists=2;
  };

  showPass=()=>{
    if(this.showPassword){
      this.showPassword=0;
    }else{
      this.showPassword=1;
    }
  };

  reset=()=>{
    this.cname='';
    this.cpassword='';
    this.iname='';
    this.ipassword='';
    this.confPassword='';
    this.imail='';
    this.output='';
  };
}
