import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransfertService {

  public deleted = false;
  public quantity = 0;
  public deckId = '';

  constructor() {}

  init = (name, quantity) => {
    this.quantity = quantity;
  };

  reinit = () => {
    this.quantity = 0;
    this.deleted = false;
    this.deckId = '';
  };
}
