import {OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TokenService} from "../authentication/token.service";

export abstract class AuthenticationRequiredComponent implements OnInit {

  constructor(protected tokenService: TokenService, protected router: Router) {

  }

  ngOnInit(): void {
    if (this.tokenService.token === null) {
      this.router.navigateByUrl('/home');
      return;
    }
    this.doInit();
  }

  abstract doInit();

}
