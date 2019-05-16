import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ZauberspeicherService {

  constructor(private http: HttpClient) {

  }

  public getZauberSpeicherForHeld(held): Observable<ZauberSpeicher[]> {
    return this.http.get<ZauberSpeicher[]>(`${environment.rest}zauberspeicher/held/${held}`);
  }

  public saveSpeicher(data): Observable<any> {
    return this.http.post(`${environment.rest}zauberspeicher`, data);
  }

  public deleteSpeicher(speicher): Observable<any> {
    return this.http.delete(`${environment.rest}zauberspeicher/speicher/${speicher}`);
  }


}


export interface ZauberSpeicher {
  id: number;
  heldid: number;
  kosten: number;
  komplexitaet: string;
  spomos: string;
  zauber: string;
  qualitaet: number;
}
