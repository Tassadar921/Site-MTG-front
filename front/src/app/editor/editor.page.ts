import {Component} from '@angular/core';
import {LoginService} from '../shared/services/login.service';
import {ModalController, Platform, ViewWillEnter} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../shared/services/http.service';
import {EditingCardComponent} from './editing-card/editing-card.component';
import {TransfertService} from './transfert.service';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements ViewWillEnter {

  public retour;
  public selectedDeck;
  public list = [];
  public output = '';
  public nbrCards = 0;
  public nbCommanders = 1;
  public displayCompagnon = false;
  public compagnon = {cardName: '', identity: ''};

  public loading = '';

  public mode = 'look';

  private refColors = [];
  private nameFromURL = '';
  private door = false; //true if already accessed to getDeck in the loop, false instead

  constructor(
    private loginServ: LoginService,
    private modalController: ModalController,
    private getVarInURL: ActivatedRoute,
    private http: HttpService,
    public platform: Platform,
    private transfertservice: TransfertService,
    public alertController: AlertController,
    private router: Router,
  ) {
  }

  async ionViewWillEnter() {
    await this.loginServ.refresh();
    await this.loadingDeck();
    const a = 1;
    console.log(Boolean(a));
  }

  test = () => {

  };

  loadingDeck = async () => {
    setTimeout(this.getDeckName, 50);
    setTimeout(this.getDeck, 100);
    this.door = false;
    this.list = [];
  };

  getDeckName = () => {
    if (this.router.url.split('?').length === 2) {
      this.nameFromURL = this.router.url.split('=')[1];
      while (this.nameFromURL.includes('%')) {
        this.nameFromURL = this.nameFromURL.replace('%20', ' ')
          .replace('%3D', '=')
          .replace(/  +/g, ' ');
      }
    }
    console.log(this.nameFromURL);
  };

  updateRef = () => {
    this.refColors = [];
    if (this.selectedDeck.black) {
      this.refColors.push('B');
    }
    if (this.selectedDeck.green) {
      this.refColors.push('G');
    }
    if (this.selectedDeck.red) {
      this.refColors.push('R');
    }
    if (this.selectedDeck.blue) {
      this.refColors.push('U');
    }
    if (this.selectedDeck.white) {
      this.refColors.push('W');
    }
  };

  updateIdentity = async () => {
    this.selectedDeck.black = false;
    this.selectedDeck.green = false;
    this.selectedDeck.red = false;
    this.selectedDeck.blue = false;
    this.selectedDeck.white = false;
    this.selectedDeck.colorless = false;
    for (const line of this.selectedDeck.commanders) {
      this.retour = await this.http.getCardInfo(line.cardName);
      for (const color of this.retour.color_identity) {
        switch (color) {
          case 'R':
            this.selectedDeck.red = true;
            break;
          case 'W':
            this.selectedDeck.white = true;
            break;
          case 'B':
            this.selectedDeck.black = true;
            break;
          case 'U':
            this.selectedDeck.blue = true;
            break;
          case 'G':
            this.selectedDeck.green = true;
            break;
        }
      }
    }
    this.selectedDeck.colorless = !(this.selectedDeck.black
      || this.selectedDeck.green || this.selectedDeck.red
      || this.selectedDeck.blue || this.selectedDeck.white);
  };

  getDeck = async () => {
    console.log('getDeck');
    this.list = [];
    this.output = '';
    this.nbrCards = 0;
    await this.getVarInURL.queryParams.subscribe(async params => {
      if (params.deckId) {
        if (!this.door && this.nameFromURL) {
          this.door = true;
          if (!this.list.length) {
            this.retour = await this.http.getDeck(this.nameFromURL);
            if (this.retour.output.status === 1) {
              this.selectedDeck = this.retour.output;
              console.log(this.selectedDeck);
              this.updateRef();
              for (const line of this.selectedDeck.list) {
                await this.addCard(line[0].cardName, line[0].quantity);
              }
              for (const line of this.list) {
                if (line[0].side1.types.includes('Basic') || line[0].side1.text.includes('A deck can have any number of cards named')) {
                  line[0].side1.canHaveMore = true;
                }
              }
            } else {
              this.output = 'Something went wrong';
            }
          }
        }
      }
    });
  };

  addCard = async (name, nbr = 1) => {
    if (name.includes('//')) {
      name = name.split('//')[1];
    }
    this.nbrCards += Number(nbr);
    this.retour = await this.http.getCardInfo(name);
    if (this.retour.oracle_text) {
      this.list.push(
        [{side1:{
          cardName: name,
          quantity: nbr,
          identity: this.retour.color_identity,
          text: this.retour.oracle_text.replaceAll('\r', ' ').replaceAll('\n', ' '),
          types: this.retour.type_line.replace('— ', ''),
          canHaveMore: false,
          ccm: this.retour.cmc,
          colorIsOK: false,
          gathererLink: this.retour.related_uris.gatherer,
          edhrecLink: this.retour.related_uris.edhrec,
          cost: this.retour.mana_cost,
        }}]);
    } else {
      this.list.push(
        [{side1: {
          cardName: this.retour.card_faces[0].name,
          quantity: nbr,
          identity: this.retour.color_identity,
          text: this.retour.card_faces[0].oracle_text.replaceAll('\r', '').replaceAll('\n', ''),
          types: this.retour.card_faces[0].type_line.replace('— ', ''),
          canHaveMore: false,
          ccm: this.retour.cmc,
          colorIsOK: false,
          gathererLink: this.retour.related_uris.gatherer,
          edhrecLink: this.retour.related_uris.edhrec,
          cost: this.retour.card_faces[0].mana_cost,
        }, side2: {
          cardName: this.retour.card_faces[1].name,
          quantity: nbr,
          identity: this.retour.color_identity,
          text: this.retour.card_faces[1].oracle_text.replaceAll('\r', '').replaceAll('\n', ''),
          types: this.retour.card_faces[1].type_line.replace('— ', ''),
          canHaveMore: false,
          ccm: this.retour.cmc,
          colorIsOK: false,
          gathererLink: this.retour.related_uris.gatherer,
          edhrecLink: this.retour.related_uris.edhrec,
          cost: this.retour.card_faces[1].mana_cost,
        }}]
      );
    }
  };

  openModal = async (name, nbr) => {
    const editingCard = await this.modalController.create({
      component: EditingCardComponent,
      backdropDismiss: false,
      componentProps: {
        cardName: name,
        quantity: nbr,
        mode: this.mode,
      },
    });
    await editingCard.present();
    await editingCard.onDidDismiss();

    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].cardName === name) {
        if (this.transfertservice.deleted || this.transfertservice.quantity === 0) {
          this.list.splice(i, 1);
        } else {
          this.list[i].quantity = this.transfertservice.quantity;
        }
        this.transfertservice.reinit();
        return 1;
      }
    }
  };

  dismissModal = async () => await this.modalController.dismiss();

  toggleMode = () => {
    if (this.mode === 'look') {
      this.mode = 'edit';
    } else {
      this.mode = 'look';
    }
  };

  checkColors = (colors) => {
    if (colors.length) {
      for (const line of colors) {
        if (!this.refColors.includes(line)) {
          return false;
        }
      }
      return true;
    } else {
      return true;
    }
  };

  onDropCommander = async (name, position) => {
    if (this.mode === 'edit') {
      console.log(name);
      let door = true;
      this.output = '';
      this.retour = await this.http.getCardInfo(name);
      console.log(this.retour);
      if ((this.retour.type_line.includes('Legendary')
          && this.retour.type_line.includes('Creature'))
        || this.retour.oracle_text.includes('can be your commander')
        || this.retour.oracle_text.includes('Choose a Background')
        || this.retour.type_line.includes('Background')){
        if(((this.selectedDeck.commanders[0]
              && this.selectedDeck.commanders[0].text.includes('Partner'))
            || (this.selectedDeck.commanders[1]
              && this.selectedDeck.commanders[1].text.includes('Partner')))
          && !this.retour.type_line.includes('Partner')){
          door = false;
        }
        if(((this.selectedDeck.commanders[0]
              && this.selectedDeck.commanders[0].text.includes('Friends forever'))
            || (this.selectedDeck.commanders[1]
              && this.selectedDeck.commanders[1].text.includes('Friends forever')))
          && !this.retour.type_line.includes('Friends forever')){
          door = false;
        }
        if(((this.selectedDeck.commanders[0]
          && this.selectedDeck.commanders[0].text.includes('Choose a Background'))
          || (this.selectedDeck.commanders[1]
          && this.selectedDeck.commanders[1].text.includes('Choose a Background')))
        && !this.retour.type_line.includes('Background')){
          door = false;
        }
        if(((this.selectedDeck.commanders[0]
              && this.selectedDeck.commanders[0].types.includes('Background'))
            || (this.selectedDeck.commanders[1]
              && this.selectedDeck.commanders[1].text.includes('Background')))
          && !this.retour.oracle_text.includes('Choose a Background')){
          door = false;
        }
        if (this.selectedDeck.commanders[0] && this.selectedDeck.commanders[0].cardName === name) {
          door = false;
        }
        if (this.selectedDeck.commanders[1] && this.selectedDeck.commanders[1].cardName === name) {
          door = false;
        }
        if (door && !this.retour.card_faces) {
          this.output = '';
          this.selectedDeck.commanders[position] = {
            cardName: this.retour.name,
            index: position,
            text: this.retour.oracle_text.replaceAll('\r', '').replaceAll('\n', ''),
            types: this.retour.type_line.replace('— ', ''),
          };
          if (this.retour.oracle_text.includes('Friends forever')
            || this.retour.oracle_text.includes('Partner')
            || this.retour.oracle_text.includes('Choose a Background')
            || this.retour.type_line.includes('Background')) {
            this.nbCommanders = 2;
          }
          await this.updateIdentity();
          this.updateRef();
        }
      }
    } else {
      this.output = 'Switch to edit mode first';
    }
  };

  onDropCompagnon = async (name) => {
    if(this.mode==='edit'){
      this.retour = await this.http.getCardInfo(name);
      console.log(this.retour);
      if(this.retour.oracle_text.includes('Companion —')){
        this.compagnon = {cardName: name, identity: this.retour.color_identity};
        this.delete(name);
      }
    }else{
      this.output = 'Switch to edit mode first';
    }
  };

  quantityLess = (name) => {
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].cardName === name) {
        if (this.list[i].quantity > 0) {
          this.list[i].quantity--;
          this.nbrCards -= 1;
          if (this.list[i].quantity === 0) {
            this.list.splice(i, 1);
          }
        }
        return 1;
      }
    }
  };

  quantityMore = (name) => {
    for (const line of this.list) {
      if (line.cardName === name) {
        line.quantity++;
        this.nbrCards += 1;
        return 1;
      }
    }
  };

  delete = (name) => {
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].cardName === name) {
        this.nbrCards -= this.list[i].quantity;
        this.list.splice(i, 1);
        return 1;
      }
    }
  };
}


