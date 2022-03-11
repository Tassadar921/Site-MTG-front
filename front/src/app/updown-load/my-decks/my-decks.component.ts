import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

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

  private cardImageBase64;

  constructor(
    // private file: File,
    private http: HttpClient,
  ) {
  }

  ngOnInit() {
    // this.file.checkDir(this.file.dataDirectory, 'mydir').then(_ => console.log('Directory exists')).catch(err =>
    //   console.log('Directory doesn\'t exist'));
  }

  test = () => {
    console.log(typeof this.uploadedFile);
    // console.log(this.uploadedFile.files);
  };

  changeFile = (event) => {
    this.file = event.target.files[0];
  };

  upload = async () => {
    const fileReader = new FileReader();
    fileReader.readAsText(this.file);
    fileReader.onload = async () => {
      console.log('a : ', await fileReader.result);
    };
  };
}
