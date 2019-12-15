import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  constructor(private http: HttpClient) { }

  public getVersionenForHeld(held: number): Observable<Version[]> {
    return this.http.get<Version[]>(`${environment.rest}helden/versionen/held/${held}`);

  }
}


export interface Version {
  letztesAbenteuer: number;
  datum: number;
  version: number;
}
