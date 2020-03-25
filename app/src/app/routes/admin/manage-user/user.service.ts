import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) {

  }

  public createUser(dto: UserRegistration) {
    return this.http.post(`${environment.rest}user/register`, dto);
  }

  public createUsers(body) {
    return this.http.post(`${environment.rest}user`, body);
  }


}


export interface UserRegistration {
  name: string
  password: string;
  token: string;
  gruppe: string;
}



