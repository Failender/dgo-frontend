import {Component} from '@angular/core';
import {HeldComponent} from '../held.component';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {HeldenService} from "../../../lib/helden/helden.service";
import {TokenService} from "../../../authentication/token.service";

@Component({
  selector: 'app-uebersicht',
  templateUrl: './held-pdf.component.html',
  styleUrls: ['./held-pdf.component.css']
})
export class HeldPdfComponent extends HeldComponent {

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
