import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeldenService {

  public held: HeldDaten;

  constructor(private http: HttpClient) {

  }

  public getMeineHelden(): Observable<HeldDto[]> {
    return this.http.get<HeldDto[]>(`${environment.rest}helden/meine`);
  }

  public getHeld(held: number): Observable<HeldDaten> {
    return this.http.get<HeldDaten>(`${environment.rest}helden/held/${held}`);
  }
  public updateActive(held: number, value: boolean) {
    return this.http.put(`${environment.rest}helden/held/${held}/active/${value}`, null);
  }

  public updatePublic(held: number, value: boolean) {
    return this.http.put(`${environment.rest}helden/held/${held}/public/${value}`, null);
  }



}

export interface HeldDaten {
  [key: string]: any;
}


export interface HeldDto {
  name: string;
  id: number;
  gruppe: string;
  public: boolean;
  active: boolean;
}
