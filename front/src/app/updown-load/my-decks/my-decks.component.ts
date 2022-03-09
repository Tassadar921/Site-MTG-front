import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-decks',
  templateUrl: './my-decks.component.html',
  styleUrls: ['./my-decks.component.scss'],
})
export class MyDecksComponent implements OnInit {

  public filter = ''; // pour plus tard
  public uploadedFile; // valeur du ngModel

  constructor() { }

  ngOnInit() {}

  test = () => {
    console.log(typeof this.uploadedFile);
  };
}
