import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeldInventarService {

  constructor(private http: HttpClient) { }

  private inventarSubject = new BehaviorSubject(null);
  public inventar


  public getInventarForHeld(held: number): Observable<HeldInventar[]> {
    return this.http.get<HeldInventar[]>(`${environment.rest}helden/inventar/held/${held}`);
  }

  public addGegenstand(gegenstand: HeldInventar): Observable<any> {
    return this.http.post(`${environment.rest}helden/inventar`, gegenstand);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${environment.rest}helden/inventar/entry/${id}`);
  }

  public updateAnzahl(id: number, anzahl: number): Observable<any> {
    return this.http.put(`${environment.rest}helden/inventar/entry/${id}/anzahl/${anzahl}`, null);

  }

}


export interface HeldInventar {
  id: number;
  name: string;
  notiz: string;
  anzahl: number;
  container: number;
  gewicht: number;
}
