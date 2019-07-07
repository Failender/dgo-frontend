import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TokenService} from 'dgo-components';
import { MatDialogRef } from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
  selector: 'dgo-login',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginDialogComponent implements OnInit {


  public form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private userService: TokenService, public dialogRef: MatDialogRef<LoginDialogComponent>, private http: HttpClient) {

  }

  ngOnInit() {
  }

  login() {
    if (!this.form.valid) {
      return;
    }

    const options = {
      headers: new HttpHeaders(this.form.value)
    }
    this.http.get(`${environment.rest}security/generate`, options)
      .subscribe(() => {
        this.dialogRef.close();
      });

  }

}
