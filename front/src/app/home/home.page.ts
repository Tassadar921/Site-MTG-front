import { Component,OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

  public iname;
  public ipassword;
  public imail;
  public confPassword;

  public cname;
  public cpassword;

  public output='';

  private retour;

  constructor(
    private http: HttpClient,
  ) {}

  ngOnInit() {
    // this.http.post('http://localhost:8080/mail', 'a').pipe().subscribe(response=>{
    //   console.log(response);
    // });
  }

  update=()=>{};

  async signUp() {

    this.output='';

    if (this.ipassword && this.confPassword && this.ipassword===this.confPassword) {

      this.output='';

      const data = {
        name: this.iname,
        password: this.ipassword,
        mail: this.imail
      };

      await this.http.post('http://localhost:8080/signIn', data).subscribe(response => {
        this.retour=response;
        this.output=this.retour.message;
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

  async signIn(){
    const data = {
      name: this.cname,
      password: this.cpassword
    };
    await this.http.post('http://localhost:8080/login', data).pipe().subscribe(response => {
      this.retour=response;
      this.output=this.retour.message;
      if(this.retour.co===true){
        console.log(data.name);
      }
    });
  }
}
