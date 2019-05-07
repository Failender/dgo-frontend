import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    }
  }

  private tokenSubject = new BehaviorSubject<string>(null);
  public tokenObs = this.tokenSubject.asObservable();

  public set token(value: string) {
    localStorage.setItem('token', value);
    this.tokenSubject.next(value);
  }

  public get token() {
    return this.tokenSubject.value;
  }

  public isAuthenticated() {
    return this.tokenSubject.value != null;
  }
}
