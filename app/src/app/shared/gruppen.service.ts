import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GruppenService {

  constructor(private http: HttpClient) {


  }

  public findAll(): Observable<Gruppe[]> {
    return this.http.get<Gruppe[]>(`${environment.rest}gruppen`);
  }

}


export interface Gruppe {
  name: string;
  datum: number;
  id: number;
}
