import {Component, OnInit, ViewChild} from '@angular/core';
import {ExportFormatService} from '../../shared/services/export-format.service';
import {ModalController} from '@ionic/angular';
import {ActionSheetController} from '@ionic/angular';
import {HttpService} from '../../shared/services/http.service';
import {LoginService} from '../../shared/services/login.service';
import {ViewMyDecksComponent} from '../../shared/components/view-my-decks/view-my-decks.component';
import {ComponentsModule} from '../../shared/components/components.module';

@Component({
  selector: 'app-my-decks',
  templateUrl: './my-decks.component.html',
  styleUrls: ['./my-decks.component.scss'],
})
export class MyDecksComponent implements OnInit {

  @ViewChild(ViewMyDecksComponent) viewMyDecks: ViewMyDecksComponent;

  public file;
  public deckType;
  public uploadedText;
  public outputText = '';
  public outputFile = '';
  public deckName = '';
  public visibility = true;

  public blue = false;
  public white = false;
  public green = false;
  public black = false;
  public red = false;
  public colorless = false;

  private retour;
  private json = {};

  constructor(
    private exportFormat: ExportFormatService,
    private modal: ModalController,
    private actionSheet: ActionSheetController,
    private http: HttpService,
    private login: LoginService,
  ) {}

  async ngOnInit() {
    this.retour = await this.http.getDeckListSharedWith(this.login.getDevice());
  }

  changeFile = (event) => {
    this.file = event.target.files[0];
    this.deckType = event.target.value.split('.')[event.target.value.split('.').length - 1];
    this.deckName = event.target.value.split('\\')[event.target.value.split('\\').length-1].split('.')[0];
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
      await this.lessThan100Cards(data.deck);
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
    const colors = {
      white: Number(this.white),
      blue: Number(this.blue),
      black: Number(this.black),
      red: Number(this.red),
      green: Number(this.green),
      colorless: Number(this.colorless)
    };
    this.retour = await this.http.uploadDeck(this.json, this.deckName, this.visibility, colors);
    this.outputFile = this.retour.message;
    this.outputText = this.retour.message;
    this.viewMyDecks.count = 0;
    await this.viewMyDecks.displayDecksFunction(0, 0, this.viewMyDecks.filter);
  };

  trigger = async (e) => {
    if (e.key === 'Enter') {
      await this.deckSave();
    }
  };

  lessThan100Cards = async (json) => {
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

  selectedColor = (color) => {
    switch(color){
      case 'blue':
        this.colorless = false;
        break;
      case 'white':
        this.colorless = false;
        break;
      case 'black':
        this.colorless = false;
        break;
      case 'red':
        this.colorless = false;
        break;
      case 'green':
        this.colorless = false;
        break;
      case 'colorless':
        this.blue = false;
        this.white = false;
        this.black = false;
        this.red = false;
        this.green = false;
        break;
    }
  };
}
