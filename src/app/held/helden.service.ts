import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeldenService {

  public heldSub = new BehaviorSubject<HeldDaten>(null);
  public currentHeld;

  constructor(private http: HttpClient) {

  }

  public activeHeld() {
    return this.heldSub.value;
  }

  public setHeld(held: HeldDaten) {
    this.heldSub.next(held);
  }

  public getMeineHelden(): Observable<HeldDto[]> {
    return this.http.get<HeldDto[]>(`${environment.rest}helden/meine`);
  }

  public getHeld(held: number): Observable<HeldDaten> {
    return this.http.get<HeldDaten>(`${environment.rest}helden/held/${held}`)
      .pipe(tap(data => {
        this.currentHeld = {
          id: held
        };
        this.setHeld(data)
      }));
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
  lastChange: string;
}
