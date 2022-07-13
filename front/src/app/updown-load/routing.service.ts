import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {TransfertService} from '../editor/transfert.service';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(
    private router: Router,
    private modal: ModalController,
    private transfert: TransfertService,
  ) { }

  viewInEditor = async (deckId) => {
    if(this.router.url.split('?')[0]==='/editor'){
      await this.modal.dismiss();
    }
    this.transfert.deckId = deckId;
    await this.router.navigateByUrl('/editor?deckId='+deckId);
  };
}
