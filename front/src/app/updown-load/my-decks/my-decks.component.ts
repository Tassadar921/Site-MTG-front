import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-my-decks',
  templateUrl: './my-decks.component.html',
  styleUrls: ['./my-decks.component.scss'],
})
export class MyDecksComponent implements OnInit {

  public filter = ''; // pour plus tard
  public uploadedFile; // valeur du ngModel
  public path;
  public file;

  constructor() {
  }

  ngOnInit() {
  }

  changeFile = (event) => {
    this.file = event.target.files[0];
  };

  upload = async () => {
    if (this.file) {
      const fileReader = new FileReader();
      fileReader.readAsText(this.file);
      fileReader.onload = async () => {
        console.log(fileReader.result);
        let tmp = fileReader.result;
        const json = this.txtToJson(fileReader.result);
      };
    }
  };

  txtToJson = (file) => {
    file = file.split(/\r\n|\n/);
    console.log(file);
    let json = [];
    let ln;
    const chars = 'azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN, \'-/';
    let tmp;
    for (const line of file) {
      let intoChain = false;
      let nbr = 0;
      let cardname = '';
      ln = line.split(' ');
      nbr = ln[0];
      for (const col of ln) {
        if (chars.includes(col[0])) {
          intoChain = true;
        }
        if (intoChain && chars.includes(col[0])) {
          cardname+=col + ' ';
        }
      }
      if(line) {
        tmp = {cardName: cardname.slice(0, cardname.length - 1), quantity: nbr};
        console.log(tmp);
        json.push(tmp);
      }
    }
    console.log(json);
    return json;
  };
}
