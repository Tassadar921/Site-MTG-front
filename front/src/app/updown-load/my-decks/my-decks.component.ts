import {Component, OnInit, ViewChild} from '@angular/core';
import {ExportFormatService} from '../../shared/services/export-format.service';
import {ModalController} from '@ionic/angular';
import {ActionSheetController} from '@ionic/angular';
import {HttpService} from '../../shared/services/http.service';
import {LoginService} from '../../shared/services/login.service';
import {ViewMyDecksComponent} from '../../shared/components/view-my-decks/view-my-decks.component';
import {UploadFileComponent} from './upload-file/upload-file.component';
import {LocalComponentsModule} from './local-components.module';
import {HttpLinkService} from './http-link.service';

@Component({
  selector: 'app-my-decks',
  templateUrl: './my-decks.component.html',
  styleUrls: ['./my-decks.component.scss'],
})
export class MyDecksComponent implements OnInit {

  @ViewChild(ViewMyDecksComponent) viewMyDecks: ViewMyDecksComponent;
  @ViewChild(UploadFileComponent) uploadFileComponent: UploadFileComponent;

  private retour;

  constructor(
    private exportFormat: ExportFormatService,
    private modal: ModalController,
    private actionSheet: ActionSheetController,
    private http: HttpService,
    private login: LoginService,
    public httpLink: HttpLinkService,
  ) {}

  async ngOnInit() {
    this.retour = await this.http.getDeckListSharedWith(this.login.getDevice());
  }

  dismissModal = async () => {
    await this.httpLink.dismissModal();
    await this.viewMyDecks.displayDecksFunction(0, 0, this.viewMyDecks.filter);
  };
}
