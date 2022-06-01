import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {ActionSheetController} from '@ionic/angular';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-view-my-decks',
  templateUrl: './view-my-decks.component.html',
  styleUrls: ['./view-my-decks.component.scss'],
})
export class ViewMyDecksComponent implements OnInit {

  public filter = '';
  public output;
  public count = 0;
  public nbPages = 1;
  public displayDecks = [];
  public myDecks = [];

  private p;
  private retour;

  constructor(
    private login: LoginService,
    private actionSheet: ActionSheetController,
    private http: HttpService,
  ){}

  async ngOnInit() {
    this.p = this.login.setPlatform();
    await this.displayDecksFunction(0, 0, '');
  }

  getnbPages = () => {
    if (this.myDecks.length) {
      return Math.ceil(this.myDecks.length / this.p);
    } else {
      return 1;
    }
  };

  nextPage = async () => {
    let start = this.p * this.count;
    if (this.p * this.count + this.p < this.myDecks.length) {
      this.count++;
      start = this.p * this.count;
    }
    await this.displayDecksFunction(this.count, start, this.filter);
  };

  previousPage = async () => {
    if (this.count !== 0) {
      this.count--;
    }
    const start = this.p * this.count;
    await this.displayDecksFunction(this.count, start, this.filter);
  };

  search = async (n, start, filter) => {
    this.count = 0;
    await this.displayDecksFunction(n, start, filter);
  };

  displayDecksFunction = async (n, start, filter) => {
    this.retour = await this.http.getUserDecks();
    this.myDecks = this.retour.list;

    let end;

    this.displayDecks = [];

    if (start < this.myDecks.length) {
      if (this.myDecks.length > start + this.p) {
        end = start + this.p;
      } else {
        end = this.myDecks.length;
      }

      for (let i = start; i < end; i++) {
        if (this.myDecks[i]) {
          if (this.myDecks[i].name.toUpperCase().includes(filter.toUpperCase())) {
            this.displayDecks.push({
              name: this.myDecks[i].name,
              lastUpdated: this.myDecks[i].lastUpdated,
              who: this.myDecks[i].who
            });
          }
        }
      }
      this.nbPages = this.getnbPages();
    }
  };

  deleteDeck = async (deckName) => {
    const actionSheet = await this.actionSheet.create({
      header: 'Are you sure to delete ' + deckName + ' ?',
      buttons: [{
        text: 'Yes',
        icon: 'checkmark',
        handler: async () => {
          this.output = await this.http.deleteDeck(deckName);
          await this.displayDecksFunction(0, 0, this.filter);
          this.count = 0;
        }
      }, {
        text: 'No',
        icon: 'close',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  };

  deckClicked = async (deckName) => {
    const actionSheet = await this.actionSheet.create({
      header: 'What do you want to do with ' + deckName + ' ?',
      buttons: [{
        text: 'Edit',
        icon: 'pencil',
        role: 'destructive',
        handler: async () => {
          await this.editDeck(deckName);
        }
      },
        {
          text: 'Share',
          icon: 'person-add',
          role: 'destructive',
          id:'test',
          handler: async () => {
            await this.shareWith(deckName);
          }
        },
        {
          text: 'Delete',
          icon: 'trash',
          role: 'destructive',
          handler: async () => {
            await this.deleteDeck(deckName);
          }
        }]
    });
    await actionSheet.present();
  };

  editDeck = (deckName) => {
    console.log('go edit ' + deckName);
    //redirect avec deckname dans url
  };

  shareWith = async (deckName) => { //TRIGGER QUAND ON AURA LA LISTE DES JOUEURS NON PARTAGES
    console.log('PARTAGEEEE');
    // this.retour = await this.http.shareDeckWith(deckName, '');
  };

}
