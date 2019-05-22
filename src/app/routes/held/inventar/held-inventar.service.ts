import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeldInventarService {

  constructor(private http: HttpClient) { }


  public getInventarForHeld(held: number): Observable<HeldInventar[]> {
    return this.http.get<HeldInventar[]>(`${environment.rest}helden/inventar/held/${held}`);
  }

  public addGegenstand(gegenstand: HeldInventar): Observable<any> {
    return this.http.post(`${environment.rest}helden/inventar`, gegenstand);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${environment.rest}helden/inventar/entry/${id}`);
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
