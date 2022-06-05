import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {HttpService} from '../../shared/services/http.service';
import {TransfertService} from '../transfert.service';

@Component({
  selector: 'app-editing-card',
  templateUrl: './editing-card.component.html',
  styleUrls: ['./editing-card.component.scss'],
})
export class EditingCardComponent implements OnInit {

  public cardName = '';
  public quantity = 0;
  public types = '';
  public mode = '';
  public deleted = false;
  public output = '';
  public actionInfo = '';

  public cardInfos;

  constructor(
    public navParams: NavParams,
    private modalController: ModalController,
    private http: HttpService,
    private transfert: TransfertService,
  ) {}

  async ngOnInit() {
    this.cardName = this.navParams.get('cardName');
    this.quantity = this.navParams.get('quantity');
    this.mode = this.navParams.get('mode');
    this.cardInfos = await this.http.getCardInfo(this.cardName);
    this.types = this.cardInfos.type_line;
    this.transfert.init(this.cardName, this.quantity);
  }

  toggleDeleted = () => {
    this.transfert.deleted = !this.transfert.deleted;
    if(this.transfert.deleted){
      this.output = this.cardName + ' deleted';
      this.actionInfo = 'Click icon to undo';
    }else{
      this.output = this.cardName + ' restored';
      this.actionInfo = '';
    }
  };

  lessQuantity = () => {
    if(this.transfert.quantity>0){
      this.transfert.quantity--;
    }
  };

  moreQuantity = () => this.transfert.quantity++;

  dismissModal = () => this.modalController.dismiss();
}
