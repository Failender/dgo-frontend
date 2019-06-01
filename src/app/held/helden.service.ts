import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeldenService {

  public heldSub = new BehaviorSubject<HeldDaten>(null);
  public currentHeld: HeldInfo;

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
      .pipe(map(data => {
        this.currentHeld = {
          id: held,
          version
        };
        this.setHeld(data);
        return data;
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
    return this.loadHeld(held, version).pipe(catchError(() => of())).toPromise();

  }

  public hasZauber() {
    return this.heldLoaded() && this.activeHeld().zauberliste.zauber.length !== 0;
  }

  private heldLoaded() {
    return this.currentHeld;
  }

}


export function initializeHeld(heldenService: HeldenService) {
  return () => heldenService.initialize();
}

export interface HeldInfo {
  id: number;
  version: number;
}

export interface HeldDaten {
  zauberliste: Zauberliste;
  sonderfertigkeiten: Sonderfertigkeiten;
  eigenschaften: Eigenschaften;
  kampfsets: KampfSets;

  [key: string]: any;
}

export interface KampfSets {
  kampfset: KampfSet[];
}

export interface KampfSet {
  ausweichen: number;
  ausweichenakrobatikmod: number;
  ausweichenausweichenmod: number;
  ausweichenmod: number;
  fernkampfwaffen: FernkampfWaffen
  ini: number;
}

export interface FernkampfWaffen {
  fernkampfwaffe: FernkampfWaffe[];
}

export interface FernkampfWaffe {
  at: string;
  kampftalent: string;
  ladezeit: number;
  name: string;
  nummer: number;
  reichweite: string;
  spalte2: string;
  tp: string;
  tpmod: string;
}

export interface Eigenschaften {
  astralenergie: Eigenschaft;
  attacke: Eigenschaft;
  ausdauer: Eigenschaft;
  charisma: Eigenschaft;
  fernkampfBasis: Eigenschaft;
  fingerfertigkeit: Eigenschaft;
  geschwindigkeit: Eigenschaft;
  gewandtheit: Eigenschaft;
  initiative: Eigenschaft;
  intuition: Eigenschaft;
  karmaenergie: Eigenschaft;
  klugheit: Eigenschaft;
  koerperkraft: Eigenschaft;
  konstitution: Eigenschaft;
  lebensenergie: Eigenschaft;
  magieresistenz: Eigenschaft;
  mut: Eigenschaft;
  parade: Eigenschaft;
  sozialstatus: Eigenschaft;
}

export interface Eigenschaft {
  akt: number;
  aktinklrueckkaufbarepasp: number;
  aussonderfertigkeiten: number;
  ausvornachteile: number;
  bereich: string;
  gekauft: number;
  grossemeditation: number;
  kaufbar: number;
  modi: number;
  muinch2: number;
  name: string;
  pasprueckkaufbar: number;
  professionmod: number;
  start: number;
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
