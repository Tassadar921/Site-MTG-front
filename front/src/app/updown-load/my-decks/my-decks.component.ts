import {Component, OnInit} from '@angular/core';
import {ExportFormatService} from '../../shared/services/export-format.service';
import {ModalController} from '@ionic/angular';
import {ActionSheetController} from '@ionic/angular';
import {HttpService} from '../../shared/services/http.service';
import {LoginService} from '../../shared/services/login.service';

@Component({
  selector: 'app-my-decks',
  templateUrl: './my-decks.component.html',
  styleUrls: ['./my-decks.component.scss'],
})
export class MyDecksComponent implements OnInit {

  public filter = ''; // pour plus tard
  public file;
  public deckType;
  public uploadedText;
  public outputText = '';
  public outputFile = '';
  public deckName = '';
  public visibility = true;
  public myDecks = [];
  public displayDecks = [];
  public count = 0;
  public nbPages = 1;
  public output;

  private retour;
  private json = {};
  private p;

  constructor(
    private exportFormat: ExportFormatService,
    private modal: ModalController,
    private actionSheet: ActionSheetController,
    private http: HttpService,
    private loginServ: LoginService,
  ) {
  }

  async ngOnInit() {
    this.p = this.loginServ.setPlatform();
    await this.displayDecksFunction(0, 0, '');
  }

  changeFile = (event) => {
    this.file = event.target.files[0];
    this.deckType = event.target.value.split('.')[event.target.value.split('.').length - 1];
  };

  uploadText = async () => {
    if (this.uploadedText) {
      this.outputText = '';
      this.retour = this.exportFormat.txtToJson(this.uploadedText);
      if (this.retour.cards === 0) {
        this.outputText = 'Doesn\'t seem to be a deck';
      } else {
        await this.checkingJson(this.retour);
      }
    } else {
      this.outputText = 'Enter a text first';
    }
  };

  uploadFile = async () => {
    if (this.file) {
      const fileReader = new FileReader();
      fileReader.readAsText(this.file);
      fileReader.onload = async () => {
        if (this.deckType === 'txt') {
          this.retour = this.exportFormat.txtToJson(fileReader.result);
        } else if (this.deckType === 'json') {
          //au cas où on en a besoin un jour
        } else if (this.deckType === 'cod') {
          this.retour = this.exportFormat.codToJson(fileReader.result);
        }
        if (this.retour.cards === 0) {
          this.outputFile = 'Doesn\'t seem to be a deck';
        } else {
          this.outputFile = '';
          await this.checkingJson(this.retour);
        }
      };
    } else {
      this.outputFile = 'Something went wrong';
    }
  };

  checkingJson = async (data) => {
    if (data.cards !== 100) {
      await this.presentActionSheet(data.deck);
    } else {
      this.json = data.deck;
      await this.deckSave();
    }
  };

  dismissModal = async () => {
    await this.modal.dismiss();
  };

  resetOnDismiss = () => {
    this.outputFile = '';
    this.outputText = '';
    this.visibility = true;
    this.deckType = '';
    this.deckName = '';
  };

  deckSave = async () => {
    this.retour = await this.http.uploadDeck(this.json, this.deckName, this.visibility);
    this.outputFile = this.retour.message;
    this.outputText = this.retour.message;
  };

  trigger = async (e) => {
    if (e.key === 'Enter') {
      await this.deckSave();
    }
  };

  presentActionSheet = async (json) => {
    const actionSheet = await this.actionSheet.create({
      header: 'Less than 100 cards in the deck, save anyway ?',
      buttons: [{
        text: 'Yes',
        role: 'destructive',
        icon: 'cloud-upload',
        handler: async () => {
          this.json = json;
          await this.deckSave();
        }
      }, {
        text: 'No',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  };

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

  editDeck = (deckName) => {
    console.log('go edit ' + deckName);
    //redirect avec deckname dans url
  };

  shareWith = (deckName) => {
    console.log('go share le deck ' + deckName + ' avec quelqu\'un');
  };
}
