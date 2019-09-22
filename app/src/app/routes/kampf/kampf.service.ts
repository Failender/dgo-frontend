import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

export interface Kampf {
  name: string;
  gruppe?: number;
  currentTeilnehmer?: number;

  teilnehmer: Kampfteilnehmer[];
}

export enum Distanzklasse {
  H, N, S, P
}

export interface Kampfteilnehmer {
  name: string;
  id?: number;
  iniBasis: number;
  iniWurf?: number;
  iniMod?: number;
  ini?: number;
  atAktion?: boolean;
  paAktion?: boolean;
  freieAktionen?: number;
  distanzklasse?: Distanzklasse;
  focussedTeilnehmer?: number;

}

@Injectable({
  providedIn: 'root'
})

export class KampfService {

  constructor(private http: HttpClient) { }

  public createKampf(kampf: Kampf): Observable<Kampf> {
    return this.http.post<Kampf>(`${environment.rest}kampf`, kampf);
  }

  public updateKampf(kampf: Kampf): Observable<Kampf> {
    return this.http.put<Kampf>(`${environment.rest}kampf`, kampf);
  }

  public nextTeilnehmer(gruppe: number): Observable<Kampf> {
    return this.http.post<Kampf>(`${environment.rest}kampf/${gruppe}/next`, null);
  }

  public halten(gruppe: number): Observable<Kampf> {
    return this.http.post<Kampf>(`${environment.rest}kampf/${gruppe}/halten`, null);
  }

  public at(gruppe: number, teilnehmer: number): Observable<Kampf> {
    return this.http.post<Kampf>(`${environment.rest}kampf/${gruppe}/teilnehmer/${teilnehmer}/at`, null);
  }

  public pa(gruppe: number, teilnehmer: number): Observable<Kampf> {
    return this.http.post<Kampf>(`${environment.rest}kampf/${gruppe}/teilnehmer/${teilnehmer}/pa`, null);
  }

  public getKampf(gruppe: number): Observable<Kampf> {
    return this.http.get<Kampf>(`${environment.rest}kampf/${gruppe}`);
  }
}
