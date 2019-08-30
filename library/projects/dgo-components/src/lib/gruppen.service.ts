import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {filter, first, share, shareReplay, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GruppenService {


  public currentGroup = new BehaviorSubject<Gruppe>(null);


  private all: Observable<Gruppe[]>
  constructor(private http: HttpClient) {
    this.all = this.findAll().pipe(tap(data => this.currentGroup.next(data[0])), shareReplay());
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

  public getCurrentGroup(): Observable<Gruppe> {
    return this.currentGroup
      .pipe(filter(gruppe => gruppe !== null));
  }

}

declare var env;


export interface Gruppe {
  name: string;
  datum: number;
  id: number;
}
