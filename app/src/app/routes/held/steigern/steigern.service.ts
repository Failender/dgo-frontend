import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SteigernService {

  constructor(private http: HttpClient) { }

  public getSteigerungsTalente(held: number) {
    return this.http.get<SteigerungsTalent[]>(`${environment.rest}helden/steigern/held/${held}`);

  }

  public updateSteigerungsTalente(held: number, steigerungen: SteigerungsTalent[]) {
    return this.http.put<SteigerungsTalent[]>(`${environment.rest}helden/steigern/held/${held}`, steigerungen);
  }

  public getApUncached(held: number): Observable<AP> {
    return this.http.get<AP>(`${environment.rest}helden/steigern/held/${held}/ap`);
  }

  public addEreignis(held: number, name: string, ap: number): Observable<AP> {
    return this.http.post<AP>(`${environment.rest}helden/steigern/held/${held}/ereignis`, {name, ap});
  }

  public steigern(held: number, talent: SteigerungsTalent) {
    const body = [{talent: talent.talent, talentwert: talent.talentwert}];
    return this.http.post<SteigerungsTalent[]>(`${environment.rest}helden/steigern/held/${held}`, body);

  }
}



export interface SteigerungsTalent {

  talent: string;
  lernmethode: string;
  talentwert: number;
  art: string;
  kosten: number;

}

export interface AP {
  gesamt: number;
  frei: number;
  genutzt: number;
}
