import { Component } from '@angular/core';
import {HeldenService} from '../../../held/helden.service';
import {Router} from '@angular/router';
import {TokenService} from '../../../authentication/token.service';
import {HeldComponent} from '../held.component';

@Component({
  selector: 'app-uebersicht',
  templateUrl: './uebersicht.component.html',
  styleUrls: ['./uebersicht.component.css']
})
export class UebersichtComponent extends HeldComponent{

  constructor(heldenService: HeldenService, router: Router, private tokenService: TokenService) {
    super(heldenService, router);
  }

  doInit() {
  }

}
