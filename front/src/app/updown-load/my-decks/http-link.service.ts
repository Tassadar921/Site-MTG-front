import {Injectable} from '@angular/core';
import {ActionSheetController, ModalController} from '@ionic/angular';
import {HttpService} from '../../shared/services/http.service';
import {ExportFormatService} from '../../shared/services/export-format.service';

@Injectable({
  providedIn: 'root'
})
export class HttpLinkService {

  public deckType;
  public file;
  public deckName = '';
  public visibility = true;
  public output = '';
  public json = {};
  public uploadedText = '';

  public count = 0;

  public colors = [
    {name: 'white', checked: false},
    {name: 'blue', checked: false},
    {name: 'black', checked: false},
    {name: 'red', checked: false},
    {name: 'green', checked: false},
    {name: 'colorless', checked: false},
  ];

  private retour;

  constructor(
    private modal: ModalController,
    private http: HttpService,
    private actionSheet: ActionSheetController,
    private exportFormat: ExportFormatService,
  ) {}

  changeFile = (event) => {
    this.file = event.target.files[0];
    this.deckType = event.target.value.split('.')[event.target.value.split('.').length - 1];
    this.deckName = event.target.value.split('\\')[event.target.value.split('\\').length-1].split('.')[0];
  };

  trigger = async (e, comp) => {
    if (e.key === 'Enter') {
      if(this.deckType && this.deckName &&
        (
          this.colors[5].checked||
          (this.colors[0].checked
            ||this.colors[1].checked
            ||this.colors[2].checked
            ||this.colors[3].checked
            ||this.colors[4].checked
          )
        )){
        if(comp==='file'){
          await this.uploadFile();
        }else if(comp==='text'){
          await this.uploadText();
        }
      }
    }
  };

  selectedColor = (color) => {
    switch(color){
      case 'white':
        this.colors[5].checked = false;
        break;
      case 'blue':
        this.colors[5].checked = false;
        break;
      case 'black':
        this.colors[5].checked = false;
        break;
      case 'red':
        this.colors[5].checked = false;
        break;
      case 'green':
        this.colors[5].checked = false;
        break;
      case 'colorless':
        this.colors[0].checked = false;
        this.colors[1].checked = false;
        this.colors[2].checked = false;
        this.colors[3].checked = false;
        this.colors[4].checked = false;
        break;
    }
  };

  deckSave = async () => {
    const colors = {
      white: this.colors[0].checked,
      blue: this.colors[1].checked,
      black: this.colors[2].checked,
      red: this.colors[3].checked,
      green: this.colors[4].checked,
      colorless: this.colors[5].checked
    };
    this.retour = await this.http.uploadDeck(this.json, this.deckName, this.visibility, colors);
    this.output = this.retour.message;
    this.count = 0;
  };

  uploadText = async () => {
    if (this.uploadedText) {
      if(this.deckName) {
        if((this.colors[0].checked||this.colors[1].checked
          ||this.colors[2].checked||this.colors[3].checked
          ||this.colors[4].checked)||this.colors[5].checked) {
          this.output = '';
          this.retour = this.exportFormat.txtToJson(this.uploadedText);
          if (this.retour.cards === 0) {
            this.output = 'Doesn\'t seem to be a deck';
          } else {
            await this.checkingJson(this.retour);
          }
        }else{
          this.output = 'Chose your identity';
        }
      }else{
        this.output = 'Name your deck';
      }
    } else {
      this.output = 'Enter a text first';
    }
  };

  uploadFile = async () => {
    this.deckType = this.deckType.split('.')[this.deckType.split('.').length - 1];
    console.log('upload function');
    if (this.file) {
      if(this.deckName) {
        if ((this.colors[0].checked || this.colors[1].checked
          || this.colors[2].checked || this.colors[3].checked
          || this.colors[4].checked) || this.colors[5].checked) {
          const fileReader = new FileReader();
          fileReader.readAsText(this.file);
          fileReader.onload = async () => {
            console.log(this.deckType);
            if (this.deckType === 'txt') {
              console.log('txt');
              this.retour = this.exportFormat.txtToJson(fileReader.result);
            } else if (this.deckType === 'json') {
              console.log('json');
              //au cas où on en a besoin un jour
            } else if (this.deckType === 'cod') {
              console.log('cod');
              this.retour = this.exportFormat.codToJson(fileReader.result);
            }
            console.log(this.retour);
            if (this.retour.cards === 0) {
              this.output = 'Doesn\'t seem to be a deck';
            } else {
              this.output = '';
              await this.checkingJson(this.retour);
            }
          };
        } else {
          this.output = 'Chose your identity';
        }
      }else {
        this.output = 'Name your deck';
      }
    } else {
      this.output = 'Enter a list first';
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

  dismissModal = async () => {
    this.output = '';
    this.output = '';
    this.visibility = true;
    this.deckType = '';
    this.deckName = '';
    this.uploadedText = '';
    for(const line of this.colors){
      line.checked=false;
    }
    await this.modal.dismiss();
  };
}
