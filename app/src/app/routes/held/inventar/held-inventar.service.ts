import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {HeldenService} from "../../../lib/helden/helden.service";

@Injectable({
  providedIn: 'root'
})
export class HeldInventarService {

  constructor(private http: HttpClient, private heldenService: HeldenService) {
    this.heldenService.heldSub
      .subscribe(() => {
        this.refreshInventarForHeld();
      });
  }

  private inventarSubject = new BehaviorSubject(null);
  public inventar = this.inventarSubject.asObservable();

  public refreshInventarForHeld(){
    this.http.get<HeldInventar[]>(`${environment.rest}helden/inventar/held/${this.heldenService.currentHeld.id}`)
      .subscribe(data => this.inventarSubject.next(data));
  }

  public addGegenstand(gegenstand: HeldInventar): Observable<any> {
    return this.http.post(`${environment.rest}helden/inventar`, gegenstand)
      .pipe(tap(() => this.refreshInventarForHeld()))
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${environment.rest}helden/inventar/entry/${id}`)
      .pipe(tap(() => this.refreshInventarForHeld()))
  }

  public updateAnzahl(id: number, anzahl: number): Observable<any> {
    return this.http.put(`${environment.rest}helden/inventar/entry/${id}/anzahl/${anzahl}`, null)
      .pipe(tap(() => this.refreshInventarForHeld()))
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
