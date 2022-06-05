import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(
    private router: Router,
    private modal: ModalController
  ) { }

  viewInEditor = (deckId) => {
    if(this.router.url.split('?')[0]==='/editor'){
      this.modal.dismiss();
    }
    this.router.navigateByUrl('/editor?deckId='+deckId);
  };
}
