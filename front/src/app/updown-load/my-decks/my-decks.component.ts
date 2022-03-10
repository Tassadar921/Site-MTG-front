import { Component, OnInit } from '@angular/core';
// import {File} from '@ionic-native/file';

@Component({
  selector: 'app-my-decks',
  templateUrl: './my-decks.component.html',
  styleUrls: ['./my-decks.component.scss'],
})
export class MyDecksComponent implements OnInit {

  public filter = ''; // pour plus tard
  public uploadedFile; // valeur du ngModel

  constructor(
    // private file: File,
  ) { }

  ngOnInit() {
    // this.file.checkDir(this.file.dataDirectory, 'mydir').then(_ => console.log('Directory exists')).catch(err =>
    //   console.log('Directory doesn\'t exist'));
  }

  test = () => {
    console.log(typeof this.uploadedFile);
    console.log(this.uploadedFile.files);
  };
}
