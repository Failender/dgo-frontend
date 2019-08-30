import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

export interface Kampf {
  name: string;
  gruppe?: number;

  teilnehmer: Kampfteilnehmer[];
}

export interface Kampfteilnehmer {
  name: string;
  id?: number;
  iniBasis: number;
  iniWurf?: number;
  readonly ini: number;

}

@Injectable({
  providedIn: 'root'
})

export class KampfService {

  constructor(private http: HttpClient) { }

  public createKampf(kampf: Kampf): Observable<Kampf> {
    return this.http.post(`${environment.rest}kampf`, kampf);
  }

  public updateKampf(kampf: Kampf): Observable<Kampf> {
    return this.http.put(`${environment.rest}kampf`, kampf);
  }

  public nextTeilnehmer(gruppe: number): Observable<Kampf> {
    return this.http.post(`${environment.rest}kampf/${gruppe}/next`, null);
  }



  public getKampf(gruppe: number): Observable<Kampf> {
    return this.http.get(`${environment.rest}kampf/${gruppe}`);
  }
}
