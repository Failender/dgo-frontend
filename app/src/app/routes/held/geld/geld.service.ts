import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeldService {

  constructor(private http: HttpClient) { }


  public getGeldBoerse(held: number): Observable<Geldboerse> {
    return this.http.get<Geldboerse>(`${environment.rest}helden/geld/held/${held}`);
  }

  public updateGeldboerse(geldboerse: Geldboerse): Observable<Geldboerse> {

    return this.http.put<Geldboerse>(`${environment.rest}helden/geld/`, geldboerse);
  }

}

export interface Geldboerse {
  id: number;
  heldid: number;
  anzahl: number;
}
