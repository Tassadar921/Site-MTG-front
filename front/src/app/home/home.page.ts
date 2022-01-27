import { Component,OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalVarsService} from '../shared/services/global-vars.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

  public iname;
  public ipassword;
  public confPassword;
  public imail;
  public token;


  public cname;
  public cpassword;

  public displayToken=0;
  public output='';

  public exists = 1;

  private retour;

  constructor(
    private http: HttpClient,
    private glob: GlobalVarsService,
  ) {}

  ngOnInit() {
    // this.http.post('http://localhost:8080/mail', 'a').pipe().subscribe(response=>{
    //   console.log(response);
    // });
  }

  switch=(val)=>{ //toggle pour les components
    this.exists=val;
  };

  update=()=>{};

  switchTokenDisplay=()=>{
    this.displayToken=0;
  };

  signUp() {

    const data={mail:this.imail};

    this.output='';

    if (this.ipassword && this.confPassword && this.ipassword===this.confPassword) {

      this.output='';

      this.http.post('http://loginmtg.tassadar.ovh:8080/mail', data).subscribe(response => {
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

    const token = {token:this.token};

    this.http.post('http://loginmtg.tassadar.ovh:8080/token', token).pipe().subscribe(response=>{
      this.retour=response;
      this.output=this.retour.message;
      if(this.retour.output===1){
        this.http.post('http://loginmtg.tassadar.ovh:8080/signUp', data).pipe().subscribe(resp=>{
          this.retour=resp;
          this.output=this.retour.message;
          if(this.retour.return===1) {
            this.glob.setNickname(this.iname);
            this.glob.setConnected(1);
          }
        });
      }
    });
  };

  signIn(){
    if(this.cname && this.cpassword) {
      const data = {
        name: this.cname,
        password: this.cpassword
      };
      this.http.post('http://loginmtg.tassadar.ovh:8080/login', data).pipe().subscribe(response => {
        this.retour = response;
        this.output = this.retour.message;
        if (this.retour.co === true) {
          this.output = this.retour.message;
        }
      });
    }else{
      if(!this.cname){
        this.output='Nickname required';
      }else{
        if(!this.cpassword){
          this.output='Password required';
        }
      }
    }
  }

  updateSignIn=(e)=>{
    if(e.key==='Enter'){
      this.signIn();
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
