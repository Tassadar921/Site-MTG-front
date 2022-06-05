import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExportFormatService {

  constructor() {}

  txtToJson = (file) => {
    file = file.split(/\r\n|\n/);
    let count = 0;
    const json = [];
    let ln;
    const chars = 'azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN, \'-/';
    let tmp;
    for (const line of file) {
      let intoChain = false;
      let nbr = 0;
      let cardname = '';
      ln = line.split(' ');
      if(ln[0]==='SB:'){
        ln.splice(0,1);
      }
      nbr = ln[0];
      for (const col of ln) {
        if (chars.includes(col[0])) {
          intoChain = true;
        }
        if (intoChain && chars.includes(col[0])) {
          cardname+=col + ' ';
        }
      }
      if(line && !isNaN(nbr)) {
        count += Number(nbr);
        tmp = {cardName: cardname.slice(0, cardname.length - 1), quantity: nbr};
        json.push([tmp]);
      }
    }
    return {deck: json, cards: count};
  };

  codToJson = (file) => {
    const json = [];
    let count = 0;
    let ln;
    let nbr;
    let cardname = '';
    let increment = false;
    let tmp;
    file = file.split(/\r\n|\n/);
    for (const line of file){
      increment = false;
      cardname='';
      if(line.includes('<card')){
        ln=line.split(' ');
        for(const col of ln){
          if(col.includes('number')){
            nbr = col.split('"')[col.split('"').length-2];
          }
          if(col.includes('name')){
            increment = true;
          }
          if(increment){
            if(cardname){
              cardname += ' ';
            }
            cardname += col;
          }
        }
        if(line && !isNaN(nbr)) {
          count += Number(nbr);
          tmp = {cardName: cardname.slice(6, cardname.length-3), quantity: nbr};
          json.push([tmp]);
        }
      }
    }
    return {deck: json, cards: count};
  };
}
