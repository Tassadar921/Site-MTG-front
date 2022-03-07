import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-decks',
  templateUrl: './my-decks.component.html',
  styleUrls: ['./my-decks.component.scss'],
})
export class MyDecksComponent implements OnInit {

  public filter = '';
  public uploadHover = 1;

  constructor() { }

  ngOnInit() {}

  switchUpload = () => {
    console.log('test');
  }

}
