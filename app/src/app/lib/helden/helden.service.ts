import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, flatMap, mapTo, tap} from 'rxjs/operators';
import {SteigernService} from "../../routes/held/steigern/steigern.service";

declare var env;

@Injectable({
  providedIn: 'root'
})
export class HeldenService {

  public heldSub = new BehaviorSubject<HeldDaten>(null);
  public currentHeld: HeldInfo;

  constructor(private http: HttpClient, private steigernService: SteigernService) {
  }

  public activeHeld() {
    return this.heldSub.value;
  }

  public setHeld(held: HeldDaten) {
    this.heldSub.next(held);
  }

  public getMeineHelden(): Observable<HeldDto[]> {
    return this.http.get<HeldDto[]>(`${env.rest}helden/meine`);
  }

  public getHeldenInGroup(gruppe: number, includePrivate: boolean, showInactive: boolean): Observable<HeldDto[]> {
    return this.http.get<HeldDto[]>(`${env.rest}gruppen/gruppe/${gruppe}/helden?includePrivate=${includePrivate}&showInactive=${showInactive}`);

  }

  public syncDso(): Observable<SynchronizationResult> {
    return this.http.post<SynchronizationResult>(`${env.rest}helden/meine/sync/dso`, null);
  }

  public syncHeldenOnline(): Observable<SynchronizationResult> {
    return this.http.post<SynchronizationResult>(`${env.rest}helden/meine/sync/helden-online`, null);
  }



  public loadHeld(held: number, version: number, setActive = true): Observable<HeldDaten> {
    return this.http.get<HeldDaten>(`${env.rest}helden/held/${held}/${version}/daten`)
      .pipe(flatMap(data => {
        if (setActive) {
          return this.steigernService.getCanSteigernForHeld(held)
            .pipe(tap(answer => {
              this.currentHeld = {
                id: held,
                version,
                steigern: answer.steigern
              };
              this.setHeld(data);

            }),
              mapTo(data));
        }
        this.setHeld(data);
        return of(data);
      }));
  }
  public updateActive(held: number, value: boolean) {
    return this.http.put(`${env.rest}helden/held/${held}/active/${value}`, null);
  }

  public updatePublic(held: number, value: boolean) {
    return this.http.put(`${env.rest}helden/held/${held}/public/${value}`, null);
  }

  public initialize() {

    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has('held')) {
      return Promise.resolve();
    }
    const held = parseInt(urlParams.get('held'), 10);
    const version = parseInt(urlParams.get('version'), 10);
    return this.loadHeld(held, version).pipe(catchError(() => of())).toPromise();

  }

  public hasSonderfertigkeit(name): boolean {
    if(!this.heldLoaded()) {
      return false;
    }
    return this.heldSub.value.sonderfertigkeiten.sonderfertigkeit.find(sf => sf.name === name) !== undefined;
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
  steigern: boolean;
}

export interface HeldDaten {
  zauberliste: Zauberliste;
  talentliste: TalentListe;
  sonderfertigkeiten: Sonderfertigkeiten;
  eigenschaften: Eigenschaften;
  kampfsets: KampfSets;
  angaben: Angaben;
  ereignisse: Ereignisse;

  [key: string]: any;
}

export interface KampfSets {
  kampfset: KampfSet[];
}

export interface Angaben {
  name: string;
}

export interface Ereignisse {
  ereignis: Ereignis[];
}

export interface Ereignis {
  aktion: string;
  alterzustand: string;
  ap: number;
  asp: number;
  bemerkung: string;
  date: string;
  kp: number;
  kommentar: string;
  lep: number;
  neuerzustand: string;
  object: string;
  version: string;
}


export interface KampfSet {
  ausweichen: number;
  ausweichenakrobatikmod: number;
  ausweichenausweichenmod: number;
  ausweichenmod: number;
  fernkampfwaffen: FernkampfWaffen;
  ruestungen: Ruestungen;
  nahkampfwaffen: NahkampfWaffen;
  ruestungzonen: Ruestung;
  ini: number;
}

export interface Ruestungen {
  ruestung: Ruestung[];
  inbenutzung: boolean;
}

export interface Ruestung {
  bauch: number;
  be: string;
  behinderung: string;
  brust: number;
  gesamt: number;
  gesamtzonenschutz: 3;
  grundlage: string;
  kopf: number;
  linkerarm: number;
  linkesbein: number;
  name: string;
  nummer: number;
  rechterarm: number;
  rechtesbein: number;
  rs: string;
  ruecken: number;
}

export interface NahkampfWaffen {
  inbenutzung: boolean;
  nahkampfwaffe: NahkampfWaffe[];
}

export interface NahkampfWaffe {
  at: string;
  be: string;
  bereich: string;
  bfakt: number;
  bfmin: number;
  dk: string;
  ini: number;
  möglich: boolean;
  name: string;
  nummer: number;
  pa: string;
  spalte2: string;
  tp: string;
  tpinkl: string;
  tpkk: TpKK;
  waffentalent: string;
  waffentalentkurz: string;
  wm: string;
}

export interface TpKK {
  value: string;
  schrittweite: number;
  schwelle: number;
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

export interface TalentListe {
  talent: Talent[];
}

export interface Talent {
  name: string;
  meisterhandwerk: boolean;
  leittalent: boolean;
  basis: boolean;
  nameausfuehrlich: string;
  wert: string;
  probe: string;
  probenwerte: string;
  nameausfuehrlichmitprobe: string;
  at: string;
  pa: string;
  sprachkomplexitaet: string;
  muttersprache: boolean;
  schriftmuttersprache: boolean;
  behinderung: string;
  mirakelplus: boolean;
  mirakelminus: boolean;
  metatalent: boolean;
  bereich: string;
  komplexitaet: string;
  lernkomplexitaet: string;
  spezialisierungen: string;

}

export interface Sonderfertigkeiten {
  sonderfertigkeit: Sonderfertigkeit[];
}

export interface Sonderfertigkeit {
  name: string;
}


export interface HeldDto {
  name: string;
  id: number;
  gruppe: string;
  public: boolean;
  active: boolean;
  lastChange: string;
  version: number;
}

export interface SynchronizationResult {
  created: number;
  updated: number;
}
