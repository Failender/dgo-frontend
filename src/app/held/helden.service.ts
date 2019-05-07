import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeldenService {


  constructor(private http: HttpClient) {

  }

  public getMeineHelden(): Observable<HeldDto[]> {
    return this.http.get<HeldDto[]>(`${environment.rest}helden/meine`);
  }

  public updateActive(held: number, value: boolean) {
    return this.http.put(`${environment.rest}helden/held/${held}/active/${value}`, null);
  }

  public updatePublic(held: number, value: boolean) {
    return this.http.put(`${environment.rest}helden/held/${held}/public/${value}`, null);
  }



}


export interface HeldDto {
  name: string;
  id: number;
  gruppe: string;
  public: boolean;
  active: boolean;
}
