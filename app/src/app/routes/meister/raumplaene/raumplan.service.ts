import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RaumplanService {

  constructor(private http: HttpClient) { }

  public getRaumplaene(): Observable<Raumplan[]> {
    return this.http.get<Raumplan[]>(`${environment.rest}meister/raumplan`);
  }

  public getRaumplan(id: number): Observable<RaumplanEbene[]> {
    return this.http.get<RaumplanEbene[]  >(`${environment.rest}meister/raumplan/ebenen/${id}`);
  }

  public deleteRaumplan(id: number): Observable<RaumplanEbene[]> {
    return this.http.delete<RaumplanEbene[]  >(`${environment.rest}meister/raumplan/ebenen/${id}`);
  }


  public addToRaumplan(id: number, ebene: RaumplanEbene) {
    return this.http.post(`${environment.rest}meister/raumplan/ebenen/${id}`, ebene);
  }

  public saveRaumplan(raumplan: Raumplan): Observable<any> {
    return this.http.post(`${environment.rest}meister/raumplan`, raumplan);
  }

  public deleteEbene(parent: number, id: number) {
    return this.http.delete(`${environment.rest}meister/raumplan/ebenen/${parent}/ebene/${id}`);

  }

}


export interface Raumplan {
  id?: number;
  name: string;
  owner?: number;
}

export interface RaumplanEbene {
  id: number;
  name: string;
  parent: number;
  beschreibung: string;
}
