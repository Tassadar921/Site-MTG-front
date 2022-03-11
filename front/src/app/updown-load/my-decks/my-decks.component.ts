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
    console.log(this.uploadedFile.files);
  };

  upload = async (event) => {
    // Get a reference to the file that has just been added to the input
    const file = event.target.files[0];

    // Create a form data object using the FormData API
    const formData = new FormData();

    // Add the file that was just added to the form data
    formData.set('file', file, file.name);

    // POST formData to server using Fetch API
    console.log(formData.get('file'));

    const reader = new FileReader();
    console.log('avant : ', file);
    reader.readAsText(file);
    console.log('après : ', file);

    const imgBase64Path = event.target.result;
    this.cardImageBase64 = imgBase64Path;
    console.log(this.cardImageBase64);
  };
}
