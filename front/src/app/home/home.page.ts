import {Component, OnInit} from '@angular/core';
import {GlobalVarsService} from '../shared/services/global-vars.service';
import {HttpService} from '../shared/services/http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  public iname = '';
  public ipassword = '';
  public confPassword = '';
  public imail = '';
  public token;

  public cname = '';
  public cpassword = '';
  public cpass = '';

  public showPassword = 1;

  public recupMail = '';

  public displayToken = 0;
  public output = '';

  public exists = 1;

  private retour;

  constructor(
    private httpService: HttpService,
    private glob: GlobalVarsService,
    private router: Router,
  ) {
  }

  ngOnInit() {
  }

  switch = (val) => { //toggle pour les components
    this.output = '';
    this.showPassword = 1;
    this.exists = val;
  };

  switchTokenDisplay = () => {
    this.token = '';
    this.displayToken = 0;
  };

  signUp = async () => {
    this.output = '';
    if (this.ipassword && this.confPassword && this.ipassword === this.confPassword) {
      this.output = '';
      this.retour = await this.httpService.mailToken(this.imail, this.iname, this.ipassword);
      this.output = this.retour.message;
      if (this.retour.output === 1) {
        this.displayToken = 1;
      }
    } else {
      if (this.ipassword && this.confPassword && this.ipassword !== this.confPassword) {
        this.output = 'Mots de passe différents';
      } else {
        if (!this.iname) {
          this.output = 'Nom d\'utilisateur requis';
        } else {
          if (!this.ipassword) {
            this.output = 'Mot de passe requis';
          } else {
            if (!this.confPassword) {
              this.output = 'Confirmation du mot de passe requise';
            } else {
              if (!this.imail) {
                this.output = 'E-mail requis';
              }
            }
          }
        }
      }
    }
  };

  signIn = async (namee, passwordd) => {
    if (namee && passwordd) {
      this.retour = await this.httpService.login(namee, passwordd);
      console.log(this.retour);
      this.output = this.retour.message;
      if (this.retour.co === true) {
        this.login(namee);
      }
    } else {
      if (!namee) {
        this.output = 'Nickname required';
      } else {
        if (!passwordd) {
          this.output = 'Password required';
        }
      }
    }
  };

  resetPassword = async () => {
    this.output = await this.httpService.sendResetPassword(this.recupMail);
  };

  login = (name) => {
    this.glob.setNickname(name);
    this.glob.switchConnected();
    console.log('bouh');
    this.router.navigateByUrl('/welcome');
  };

  updateSignIn = (e) => {
    if (e.key === 'Enter') {
      this.signIn(this.cname, this.cpassword);
    }
  };

  updateSignUp = (e) => {
    if (e.key === 'Enter') {
      this.signUp();
    }
  };

  updateResetPassword = (e) => {
    if (e.key === 'Enter') {
      this.resetPassword();
    }
  };

  backToLogin = () => {
    this.recupMail = '';
    this.exists = 1;
    this.output = '';
  };

  sendPassword = () => {
    this.output = '';
    this.exists = 2;
  };

  showPass = () => {
    if (this.showPassword) {
      this.showPassword = 0;
    } else {
      this.showPassword = 1;
    }
  };

  reset = () => {
    this.cname = '';
    this.cpassword = '';
    this.iname = '';
    this.ipassword = '';
    this.confPassword = '';
    this.imail = '';
    this.output = '';
  };
}
