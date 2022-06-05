import {Component, OnInit, ViewChild} from '@angular/core';
import {LoginService} from '../shared/services/login.service';
import {ModalController, Platform} from '@ionic/angular';
import {ViewDecksComponent} from '../shared/components/view-decks/view-decks.component';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../shared/services/http.service';
import {EditingCardComponent} from './editing-card/editing-card.component';
import {TransfertService} from './transfert.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit {

  @ViewChild(ViewDecksComponent) viewDecks: ViewDecksComponent;

  public retour;
  public selectedDeck;
  public list = [];
  public test;
  public output = '';
  public nbrCards = 0;

  public mode = 'look';

  constructor(
    private loginServ: LoginService,
    private modalController: ModalController,
    private getVarInURL: ActivatedRoute,
    private http: HttpService,
    public platform: Platform,
    private transfertFromClickedCard: TransfertService,
  ) {
  }

  async ngOnInit() {
    await this.loginServ.refresh();
    await this.getDeck();
  }

  getDeck = async () => {
    this.list = [];
    this.output = '';
    await this.getVarInURL.queryParams.subscribe(async (params) => {
      if (!this.list.length) {
        if (params.deckId) {
          this.retour = await this.http.getDeck(params.deckId);
          if (this.retour.output.status === 1) {
            this.selectedDeck = this.retour.output;
            for (const line of this.selectedDeck.list) {
              this.nbrCards += Number(line[0].quantity);
              this.retour = await this.http.getCardInfo(line[0].cardName);
              this.list.push(
                {
                  cardName: line[0].cardName,
                  quantity: line[0].quantity,
                  colors: this.retour.color_identity,
                  text: this.retour.oracle_text.replaceAll('\r', '').replaceAll('\n', ''),
                  types: this.retour.type_line.replace('— ', ''),
                  canHaveMore: false,
                });
            }
            for (const line of this.list) {
              if (line.types.includes('Basic') || line.text.includes('A deck can have any number of cards named')) {
                line.canHaveMore = true;
              }
            }
          }
        } else {
          this.output = 'Something went wrong';
        }
      }
    });
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
        if (this.transfertFromClickedCard.deleted || this.transfertFromClickedCard.quantity===0) {
          this.list.splice(i, 1);
        } else {
            this.list[i].quantity = this.transfertFromClickedCard.quantity;
        }
        this.transfertFromClickedCard.reinit();
        return 1;
      }
    }
  };

  delete = (name) => {
    for(let i=0; i<this.list.length;i++){
      if(this.list[i].cardName===name){
        this.list.splice(i,1);
      }
    }
  };

  dismissModal = () => this.modalController.dismiss();

  toggleMode = () => {
    if (this.mode === 'look') {
      this.mode = 'edit';
    } else {
      this.mode = 'look';
    }
  };

  onDropCommander = (data) => {
    const card = JSON.parse(data);
    if (card.types.includes('Legendary Creature') || card.text.includes('can be your commander')) {
      this.output = '';
      this.selectedDeck.commander = card.name;
    }
  };

}
