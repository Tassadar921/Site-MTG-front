import {Component, OnInit} from '@angular/core';
import {ExportFormatService} from '../../shared/services/export-format.service';
import {ModalController} from '@ionic/angular';
import {ActionSheetController} from '@ionic/angular';
import {HttpService} from '../../shared/services/http.service';

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
  public outputSubmit;

  private retour;
  private json = {};

  constructor(
    private exportFormat: ExportFormatService,
    private modal: ModalController,
    private actionSheet: ActionSheetController,
    private http: HttpService,
  ) {}

  async ngOnInit() {
    this.retour = await this.http.getUserDecks();
    console.log(this.retour.list);
  }

  test = () => console.log('test');

  changeFile = (event) => {
    this.file = event.target.files[0];
    this.deckType = event.target.value.split('.')[event.target.value.split('.').length-1];
  };

  uploadText = async () => {
    if(this.uploadedText){
      this.outputText = '';
      this.retour = this.exportFormat.txtToJson(this.uploadedText);
      if(this.retour.cards === 0){
        this.outputText = 'Doesn\'t seem to be a deck';
      }else {
        await this.checkingJson(this.retour);
      }
    } else{
      this.outputText = 'Enter a text first';
    }
  };

  uploadFile = async () => {
    if (this.file) {
      const fileReader = new FileReader();
      fileReader.readAsText(this.file);
      fileReader.onload = async () => {
        if(this.deckType==='txt') {
          this.retour = this.exportFormat.txtToJson(fileReader.result);
        }else if (this.deckType==='json'){
          //au cas où on en a besoin un jour
        }else if (this.deckType==='cod'){
          this.retour = this.exportFormat.codToJson(fileReader.result);
        }
        console.log(this.retour);
        if(this.retour.cards === 0){
          this.outputFile = 'Doesn\'t seem to be a deck';
        }else {
          this.outputFile='';
          await this.checkingJson(this.retour);
        }
      };
    }else{
      this.outputFile = 'Something went wrong';
    }
  };

  checkingJson = async (data) => {
    if(data.cards!==100){
      await this.presentActionSheet(data.deck);
    }else{
      this.json=data.deck;
      await this.deckSave();
    }
  };

  dismissModal = () => this.modal.dismiss();

  deckSave = async () => {
    console.log('name : ', this.deckName);
    console.log('list : ', this.json);
    // this.http.uploadDeck(json.deck, )
    this.outputSubmit = this.retour.output;
  };

  trigger = async (e) => {
    if(e.key==='Enter'){
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
        handler: () => {}
      }]
    });
    await actionSheet.present();
  };
}
