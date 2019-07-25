import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GruppenService {


  public currentGroup = new BehaviorSubject<Gruppe>(null);

  constructor(private http: HttpClient) {

  }

  public findAll(): Observable<Gruppe[]> {
    return this.http.get<Gruppe[]>(`${env.rest}gruppen`);
  }

}

declare var env;


export interface Gruppe {
  name: string;
  datum: number;
  id: number;
}
