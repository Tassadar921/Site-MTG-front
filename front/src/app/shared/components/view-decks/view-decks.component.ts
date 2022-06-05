import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http.service';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {RoutingService} from '../../../updown-load/routing.service';

@Component({
  selector: 'app-view-decks',
  templateUrl: './view-decks.component.html',
  styleUrls: ['./view-decks.component.scss'],
})
export class ViewDecksComponent implements OnInit {

  public filter = '';
  public displayDecks = [];
  public nbPages;
  public count = 0;
  public publicDecks = [];

  private retour;
  private p;

  constructor(
    private http: HttpService,
    public login: LoginService,
    public routing: RoutingService
  ) {}

  async ngOnInit() {
    this.p=this.login.setPlatform();
    await this.displayDecksFunction(0, 0, '');
  }

  getnbPages = () => {
    if (this.publicDecks.length) {
      return Math.ceil(this.publicDecks.length / this.p);
    } else {
      return 1;
    }
  };

  nextPage = async () => {
    let start = this.p * this.count;
    if (this.p * this.count + this.p < this.publicDecks.length) {
      this.count++;
      start = this.p * this.count;
    }
    await this.displayDecksFunction(this.count, start, this.filter);
  };

  previousPage = async () => {
    if (this.count !== 0) {
      this.count--;
    }
    const start = this.p * this.count;
    await this.displayDecksFunction(this.count, start, this.filter);
  };

  search = async (n, start, filter) => {
    this.count = 0;
    await this.displayDecksFunction(n, start, filter);
  };

  displayDecksFunction = async (n, start, filter) => {
    this.retour = await this.http.getVisibleDecks(this.login.getDevice());
    this.publicDecks = this.retour.output;

    let end;

    this.displayDecks = [];

    if (start < this.publicDecks.length) {
      if (this.publicDecks.length > start + this.p) {
        end = start + this.p;
      } else {
        end = this.publicDecks.length;
      }

      for (let i = start; i < end; i++) {
        if (this.publicDecks[i]) {
          if (this.publicDecks[i].deckName.toUpperCase().includes(filter.toUpperCase())) {
            this.displayDecks.push(this.publicDecks[i]);
          }
        }
      }
    }
    this.nbPages = this.getnbPages();
  };
}
