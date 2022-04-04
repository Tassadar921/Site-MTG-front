import {Component, OnInit} from '@angular/core';
import {ExportFormatService} from '../../shared/services/export-format.service';
import {ModalController} from '@ionic/angular';
import {ActionSheetController} from '@ionic/angular';

@Component({
  selector: 'app-my-decks',
  templateUrl: './my-decks.component.html',
  styleUrls: ['./my-decks.component.scss'],
})
export class MyDecksComponent implements OnInit {

  public filter = ''; // pour plus tard
  public uploadedFile; // valeur du ngModel
  public path;
  public file;
  public deckType;
  public uploadedText;
  public outputText = '';
  public outputFile = '';

  constructor(
    private exportFormat: ExportFormatService,
    private modal: ModalController,
    private actionSheet: ActionSheetController,
  ) {}

  ngOnInit() {}

  changeFile = (event) => {
    this.file = event.target.files[0];
    this.deckType = event.target.value.split('.')[event.target.value.split('.').length-1];
  };

  uploadText = async () => {
    if(this.uploadedText){
      this.outputText = '';
      await this.checkingJson(this.exportFormat.txtToJson(this.uploadedText));
    } else{
      this.outputText = 'Enter a text first';
    }
  };

  uploadFile = async () => {
    if (this.file) {
      let retour;
      const fileReader = new FileReader();
      fileReader.readAsText(this.file);
      fileReader.onload = async () => {
        if(this.deckType==='txt') {
          retour = this.exportFormat.txtToJson(fileReader.result);
        }else if (this.deckType==='json'){
          //au cas où on en a besoin un jour
        }else if (this.deckType==='cod'){
          retour = this.exportFormat.codToJson(fileReader.result);
        }
        await this.checkingJson(retour);
      };
    }else{
      this.outputFile = 'Something went wrong';
    }
  };

  checkingJson = async (data) => {
    if(data.cards!==100){
      await this.presentActionSheet(data.deck);
    }else{
      await this.deckSave(data.deck);
    }
  };

  dismiss = () => this.modal.dismiss();

  deckSave = async (json) => {
    console.log('saving the deck');
  };

  presentActionSheet = async (json) => {
    const actionSheet = await this.actionSheet.create({
      header: 'Less than 100 cards in the deck, save anyway ?',
      buttons: [{
        text: 'Yes',
        role: 'destructive',
        icon: 'cloud-upload',
        handler: async () => {
          await this.deckSave(json);
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
