import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-decks',
  templateUrl: './my-decks.component.html',
  styleUrls: ['./my-decks.component.scss'],
})
export class MyDecksComponent implements OnInit {

  public filter = ''; // pour plus tard
  public uploadedFile; // valeur du ngModel
  public fileSelector; //objet html

  constructor() { }

  ngOnInit() {
    this.buildFileSelector();
  }

  buildFileSelector = () => { // build de l'input dans le ts
    this.fileSelector = document.createElement('input');
    this.fileSelector.setAttribute('type', 'file');
    this.fileSelector.setAttribute('ngModel','uploadedFile');
    this.fileSelector.
  };

  handleFileSelect = (e) => { //trigger au click
    e.preventDefault();
    this.fileSelector.click();
    console.log(this.fileSelector);
  };

}
