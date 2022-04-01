import {Component, OnInit} from '@angular/core';
import {ExportFormatService} from '../../shared/services/export-format.service';

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
  public deckType;

  constructor(
    private exportFormat: ExportFormatService,
  ) {}

  ngOnInit() {}

  changeFile = (event) => {
    this.file = event.target.files[0];
    this.deckType = event.target.value.split('.')[event.target.value.split('.').length-1];
  };

  upload = async () => {
    if (this.file) {
      let json;
      const fileReader = new FileReader();
      fileReader.readAsText(this.file);
      fileReader.onload = async () => {
        console.log(fileReader.result);
        if(this.deckType==='txt') {
          json = this.exportFormat.txtToJson(fileReader.result);
        }else if (this.deckType==='json'){
          //au cas où on le remet un jour
        }else if (this.deckType==='cod'){
          json = this.exportFormat.codToJson(fileReader.result);
        }
        console.log(json);
      };
    }
  };


}
