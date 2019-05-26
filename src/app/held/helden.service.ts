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

  public loadHeld(held: number, version: number): Observable<HeldDaten> {
    return this.http.get<HeldDaten>(`${environment.rest}helden/held/${held}/${version}/daten`)
      .pipe(tap(data => {
        this.currentHeld = {
          id: held,
          version
        };
        this.setHeld(data);
      }));
  }
  public updateActive(held: number, value: boolean) {
    return this.http.put(`${environment.rest}helden/held/${held}/active/${value}`, null);
  }

  public updatePublic(held: number, value: boolean) {
    return this.http.put(`${environment.rest}helden/held/${held}/public/${value}`, null);
  }

  public initialize() {

    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has('held')) {
      return Promise.resolve();
    }
    const held = parseInt(urlParams.get('held'),10);
    const version = parseInt(urlParams.get('version'), 10);
    return this.loadHeld(held, version).toPromise();

  }

}


export function initializeHeld(heldenService: HeldenService) {
  return () => heldenService.initialize();
}

export interface HeldDaten {
  zauberliste: Zauberliste;
  sonderfertigkeiten: Sonderfertigkeiten;

  [key: string]: any;
}

export interface Zauberliste {
  zauber: Zauber[];
}

export interface Sonderfertigkeiten {
  sonderfertigkeit: Sonderfertigkeit[];
}

export interface Sonderfertigkeit {
  name: string;
}

export interface Zauber {
  name: string;
  hauszauber: boolean;
  komplexität: string;
  lernkomplexität: string;
  merkmale: string;
  probe: string;
  wert: number;
  repraesentation: string;
  probenwerte: string;
  quelle: {
    buch: string;
    content: string;
    seite: number;
  };
}


export interface HeldDto {
  name: string;
  id: number;
  gruppe: string;
  public: boolean;
  active: boolean;
  lastChange: string;
}
