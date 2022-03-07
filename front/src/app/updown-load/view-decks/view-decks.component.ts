import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-decks',
  templateUrl: './view-decks.component.html',
  styleUrls: ['./view-decks.component.scss'],
})
export class ViewDecksComponent implements OnInit {

  public filter = '';

  constructor() { }

  ngOnInit() {}

}
