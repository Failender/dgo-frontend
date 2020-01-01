import {Injectable} from '@angular/core';
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

  public compare(held: number, from: number, to: number): Observable<Differences> {
    return this.http.get<Differences>(`${environment.rest}helden/versionen/held/${held}/compare/${from}/${to}`);

  }


}

export interface Differences {
  heldname: string;
  talente: Difference[];
  zauber: Difference[];
  vorteile: Difference[];
  eigenschaften: Difference[];
  sonderfertigkeiten: Difference[];
  steigerungen: Steigerung[];
}

export interface Difference {
  oldValue: any;
  newValue: any;
  name: string;
  tooltip: string;
}

export interface Steigerung {
  name: string;
  lehrmeisterTaw: number;
  ap: number;
  kostenHeller: number;
  kostenDukaten: string;
  modifier: number;
}

export interface Version {
  letztesAbenteuer: number;
  datum: number;
  version: number;
}
