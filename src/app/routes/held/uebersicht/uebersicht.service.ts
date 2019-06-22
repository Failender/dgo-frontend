import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Geldboerse} from '../geld/geld.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UebersichtService {

  constructor(private http: HttpClient) { }

  public getUebersichtForHeld(held: number): Observable<Uebersicht> {
    return this.http.get<Uebersicht>(`${environment.rest}helden/uebersicht/held/${held}`);
  }

  public updateUebersicht(uebersicht: Uebersicht): Observable<Uebersicht> {

    return this.http.put<Uebersicht>(`${environment.rest}helden/uebersicht/`, uebersicht);
  }


}


export interface Uebersicht {
  id: number;
  heldid: number;
  asp: number;
  lep: number;
  wunden: number[];
}
