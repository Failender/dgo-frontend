import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {SharedModule} from "../shared.module";


@Injectable({
  providedIn: SharedModule
})
export class TokenService {

  constructor() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    }

    if (localStorage.getItem('permissions')) {
      this._permissions = localStorage.getItem('permissions').split(',');
    }

    if (localStorage.getItem('pdfs')) {
      this._visiblePdfs = localStorage.getItem('pdfs').split(',');
    }




  }


  private tokenSubject = new BehaviorSubject<string>(null);
  public tokenObs = this.tokenSubject.asObservable();
  private _permissions: string[] = [];
  private _visiblePdfs: string[] = [];
  public set token(value: string) {
    localStorage.setItem('token', value);
    this.tokenSubject.next(value);
  }

  public get token() {
    return this.tokenSubject.value;
  }

  public set permissions(value: string[]) {
    localStorage.setItem('permissions', value.join(','));
    this._permissions = value;
  }

  public get permissions() {
    return this._permissions;
  }

  public set visiblePdfs(value: string[]) {
    localStorage.setItem('pdfs', value.join(','));
    this._visiblePdfs = value;
  }

  public get visiblePdfs() {
    return this._visiblePdfs;
  }


  public isAuthenticated() {
    return this.tokenSubject.value != null;
  }
}
