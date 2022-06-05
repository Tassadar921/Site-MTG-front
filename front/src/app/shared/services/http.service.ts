import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private retour;

  constructor(
    private storage: StorageService,
    private http: HttpClient,
    ) {}

  ////////////////////////////// MAILS //////////////////////////////

  checkToken = async (tok, email) => {
    const token = {
      token: tok,
      mail: email,
    };
    await this.http.post<string>(environment.urlBack + 'checkToken', token).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour;
  };

  mailToken = async (email, username, pass) => {
    const data = {
      mail: email,
      name: username,
      password: pass
    };
    await this.http.post<string>(environment.urlBack + 'mailToken', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour;
  };

  sendResetPassword = async (email) => {
    const data = {mail: email};
    await this.http.post<string>(environment.urlBack + 'sendResetPassword', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour.message;
  };

  ////////////////////////////// ACCOUNTS //////////////////////////////
  signUp = async (username, pass, email) => {
    const data = {
      name: username,
      password: pass,
      mail: email
    };
    await this.http.post<string>(environment.urlBack + 'signUp', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour;
  };

  login = async (username, pass) => {
    const data = {
      name: username,
      password: pass,
    };
    await this.http.post<string>(environment.urlBack + 'login', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour;
  };

  resetPassword = async (userId, pass) => {
    const data = {
      id: userId,
      password: pass
    };
    await this.http.post<string>(environment.urlBack + 'resetPassword', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour;
  };

  getUserIdByUsername = async (username) => {
    const data = {name: username};
    await this.http.post<string>(environment.urlBack + 'getUserIdByUsername', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour;
  };

  getUserDemandsReceivedLength = async () => {
    const data = {name: await this.storage.getNickname()};
    await this.http.post<Array<string>>(environment.urlBack + 'getUserDemandsReceived', data).toPromise().then(res => {
      this.retour = res;
    });
    return this.retour.demands.length;
  };

  getUserFriends = async () => {
    const data = {name: await this.storage.getNickname()};
    await this.http.post<Array<string>>(environment.urlBack + 'getUserFriends', data).toPromise().then(res => {
      this.retour = res;
    });
    return this.retour.links;
  };

  getUserListExceptOne = async () => {
    const data = {name: await this.storage.getNickname()};
    await this.http.post<Array<string>>(environment.urlBack + 'getUserListExceptOne', data).toPromise().then(res => {
      this.retour = res;
    });
    return this.retour.output;
  };

  getUserDemandsSent = async () => {
    const data = {name: await this.storage.getNickname()};
    await this.http.post<Array<string>>(environment.urlBack + 'getUserDemandsSent', data).toPromise().then(res => {
      this.retour = res;
    });
    return this.retour.demands;
  };

  getUserDemandsReceived = async () => {
    const data = {name: await this.storage.getNickname()};
    await this.http.post<Array<string>>(environment.urlBack + 'getUserDemandsReceived', data).toPromise().then(res => {
      this.retour = res;
    });
    return this.retour.demands;
  };

  askFriend = async (username) => {
    const data = {from: await this.storage.getNickname(), to: username};
    await this.http.post<Array<string>>(environment.urlBack + 'askFriend', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour.message;
  };

  addFriend = async (username) => {
    const data = {user1: await this.storage.getNickname(), user2: username};
    this.retour = await this.deleteDemand(await this.storage.getNickname(), username);
    this.retour = await this.deleteDemand(username, await this.storage.getNickname());
    await this.http.post<string>(environment.urlBack + 'addFriend', data).toPromise().then(response => {
      this.retour = response;
    });

    return this.retour.message;
  };

  deleteFriendship = async (username) => {
    const data = {username1: username, username2: await this.storage.getNickname()};
    await this.http.post<string>(environment.urlBack + 'deleteFriendship', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour;
  };

  deleteDemand = async (send, receive) => {
    console.log('sender : ', send);
    console.log('receiver : ', receive);
    const data = {sender: send, receiver: receive};
    await this.http.post<string>(environment.urlBack + 'deleteDemand', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour.message;
  };

  lastConnected = async (username) => {
    const data = {name: username};
    await this.http.post<string>(environment.urlBack + 'lastConnected', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour;
  };

  ////////////////////////////// DECKS //////////////////////////////

  uploadDeck = async (deckList, deckName, forEveryone, color) => {
    const data = {name: deckName, list: deckList, public: forEveryone, owner: await this.storage.getNickname(), colors: color};
    await this.http.post<string>(environment.urlBack + 'uploadDeck', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour;
  };

  getUserDecks = async (deviceType) => {
    const data = {username: await this.storage.getNickname(), platform: deviceType};
    await this.http.post<string>(environment.urlBack + 'getUserDecks', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour;
  };

  deleteDeck = async (deckName) => {
    const data = {username: await this.storage.getNickname(), name: deckName};
    await this.http.post<string>(environment.urlBack + 'deleteDeck', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour.output;
  };

  shareDeckWith = async (deckId, list) => {
    const data = {id: deckId, with: list, owner: await this.storage.getNickname()};
    await this.http.post<string>(environment.urlBack + 'shareDeckWith', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour;
  };

  getListSharedWith = async (deckId) => {
    const data = {id: deckId};
    await this.http.post<string>(environment.urlBack + 'getListSharedWith', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour;
  };

  getDeckListSharedWith = async (deviceType) => {
    const data = {username: await this.storage.getNickname(), platform: deviceType};
    await this.http.post<string>(environment.urlBack + 'getDeckListSharedWith', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour;
  };

  getVisibleDecks = async (deviceType) => {
    const data = {username: await this.storage.getNickname(), platform: deviceType};
    await this.http.post<string>(environment.urlBack + 'getVisibleDecks', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour;
  };

  getDeck = async (deckId) => {
    const data = {username: await this.storage.getNickname(), id: deckId};
    await this.http.post<string>(environment.urlBack + 'getDeck', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour;
  };

  ////////////////////////////// SCRYFALL REQUESTS //////////////////////////////

  getCardInfo = async (name) => {
    await this.http.get<string>('https://api.scryfall.com/cards/named?exact='+name+'&format=json').toPromise().then(response => {
      this.retour = response;
    });
    return this.retour;
  };
}
