import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenService} from "../../token/token.service";

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

  constructor(private tokenService: TokenService, public dialogRef: MatDialogRef<LoginDialogComponent>, private http: HttpClient) {

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
    this.http.get(`${env.rest}security/generate`, options)
      .subscribe(() => {
        this.dialogRef.close();
      });

  }

}


declare var env;
