import { Component, OnInit } from '@angular/core';
import {HeldComponent} from '../held.component';
import {HeldenService} from '../../../held/helden.service';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {TokenService} from '../../../authentication/token.service';

@Component({
  selector: 'app-uebersicht',
  templateUrl: './uebersicht.component.html',
  styleUrls: ['./uebersicht.component.css']
})
export class UebersichtComponent extends HeldComponent {

  public pdfOptions;

  constructor(heldenService: HeldenService, router: Router, private tokenService: TokenService) {
    super(heldenService, router);
  }

  doInit() {
    const url = environment.rest + `helden/held/${this.heldInfo.id}/${this.heldInfo.version}/pdf`;
    this.pdfOptions = {
      url,
      httpHeaders: {
        token: this.tokenService.token
      }
    };
  }


}
