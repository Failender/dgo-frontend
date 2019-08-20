import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {first, share, shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GruppenService {


  public currentGroup = new BehaviorSubject<Gruppe>(null);


  private all: Observable<Gruppe[]>
  constructor(private http: HttpClient) {
    this.all = this.findAll().pipe(shareReplay());
  }

  private findAll(): Observable<Gruppe[]> {
    return this.http.get<Gruppe[]>(`${env.rest}gruppen`);
  }

  public getAll(): Observable<Gruppe[]> {
    return this.all.pipe(first());
  }

  public selectGroup(gruppe: Gruppe) {
    this.currentGroup.next(gruppe);
  }

}

declare var env;


export interface Gruppe {
  name: string;
  datum: number;
  id: number;
}
