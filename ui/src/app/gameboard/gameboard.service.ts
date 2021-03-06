import { Injectable }       from '@angular/core';
import { Http, Response, Headers, RequestOptions }   from '@angular/http';
import { Observable }       from 'rxjs/Observable';
import { Gameboard }         from './gameboard';
import { Game }         from '../game/game';
import { BuzzUtils }    from '../buzzutils'

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class GameboardService {
  constructor (
    private http: Http,
    private buzzutils: BuzzUtils
  ) {}

  private gameBoardUrl = this.buzzutils.baseURL() + "gameboard/"

  getGameboard(gameName: string, username: string): Observable<Gameboard> {
    let gameboardName: string = this.buzzutils.gameboardName(gameName, username);
    return this.http.get(this.gameBoardUrl + gameboardName)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteGameboard(gamename: string, playername: string): Observable<Gameboard>{
    return this.http.delete(this.gameBoardUrl + this.buzzutils.gameboardName(gamename, playername))
      .map(this.extractData)
      .catch(this.handleError);
  }

  toggle(gamename: string, playername: string, index: number): Observable<Gameboard> {
    return this.http.put(this.gameBoardUrl + this.buzzutils.gameboardName(gamename, playername) + "/" + index, "" )
      .map(this.extractData)
      .catch(this.handleError);
  }

  bingo(gamename: string, playername: string): Observable<Gameboard> {
    return this.http.put(this.gameBoardUrl + this.buzzutils.gameboardName(gamename, playername) + "/bingo", "" )
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log(body)
    return body || { };
  }
  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}
