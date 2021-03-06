import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../shared/services/http.service';
import {LoginService} from '../../shared/services/login.service';
import {RoutingService} from '../routing.service';

@Component({
  selector: 'app-shared-with-me',
  templateUrl: './shared-with-me.component.html',
  styleUrls: ['./shared-with-me.component.scss'],
})
export class SharedWithMeComponent implements OnInit {

  public filter = '';
  public displayDecks = [];
  public nbPages;
  public count = 0;
  public sharedWithMeDecks = [];

  private retour;
  private p;

  constructor(
    private http: HttpService,
    public login: LoginService,
    public routing: RoutingService,
  ) {}

  async ngOnInit() {
    this.p=this.login.setPlatform();
    await this.displayDecksFunction(0, 0, '');
  }

  getnbPages = () => {
    if (this.sharedWithMeDecks.length) {
      return Math.ceil(this.sharedWithMeDecks.length / this.p);
    } else {
      return 1;
    }
  };

  nextPage = async () => {
    let start = this.p * this.count;
    if (this.p * this.count + this.p < this.sharedWithMeDecks.length) {
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
    this.retour = await this.http.getDeckListSharedWith(this.login.getDevice());
    this.sharedWithMeDecks = this.retour.output;

    let end;

    this.displayDecks = [];

    if (start < this.sharedWithMeDecks.length) {
      if (this.sharedWithMeDecks.length > start + this.p) {
        end = start + this.p;
      } else {
        end = this.sharedWithMeDecks.length;
      }

      for (let i = start; i < end; i++) {
        if (this.sharedWithMeDecks[i]) {
          if (this.sharedWithMeDecks[i].deckName.toUpperCase().includes(filter.toUpperCase())) {
            this.displayDecks.push(this.sharedWithMeDecks[i]);
          }
        }
      }
    }
    this.nbPages = this.getnbPages();
  };
}
