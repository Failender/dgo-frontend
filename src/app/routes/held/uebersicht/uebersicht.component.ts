import { Component} from '@angular/core';
import {HeldComponent} from '../held.component';
import {Eigenschaft, HeldenService} from '../../../held/helden.service';
import {Router} from '@angular/router';

import {Uebersicht, UebersichtService} from './uebersicht.service';

@Component({
  selector: 'app-uebersicht',
  templateUrl: './uebersicht.component.html',
  styleUrls: ['./uebersicht.component.css']
})
export class UebersichtComponent extends HeldComponent  {

  public eigenschaften;
  public uebersicht: Uebersicht;

  constructor(heldenService: HeldenService, router: Router, private uebersichtService: UebersichtService) {
    super(heldenService, router);
  }

  doInit() {
    console.debug(this.held)
    this.uebersichtService.getUebersichtForHeld(this.heldInfo.id)
      .subscribe(data => this.uebersicht = data);
    this.prepareEigenschaften();
  }

  public prepareEigenschaften() {
    this.eigenschaften = [];
    this.addEigenschaft(this.held.eigenschaften.mut);
    this.addEigenschaft(this.held.eigenschaften.klugheit);
    this.addEigenschaft(this.held.eigenschaften.intuition);
    this.addEigenschaft(this.held.eigenschaften.charisma);
    this.addEigenschaft(this.held.eigenschaften.fingerfertigkeit);
    this.addEigenschaft(this.held.eigenschaften.gewandtheit);
    this.addEigenschaft(this.held.eigenschaften.konstitution);
    this.addEigenschaft(this.held.eigenschaften.koerperkraft);
  }

  private addEigenschaft(eigenschaft: Eigenschaft) {
    this.eigenschaften.push(EIGENSCHAFT_TO_SHORT[eigenschaft.name] + ' ' + eigenschaft.akt);

  }
}

export const EIGENSCHAFT_TO_SHORT = {};
EIGENSCHAFT_TO_SHORT['Mut'] = 'MU';
EIGENSCHAFT_TO_SHORT['Klugheit'] = 'KL';
EIGENSCHAFT_TO_SHORT['Intuition'] = 'IN';
EIGENSCHAFT_TO_SHORT['Charisma'] = 'CH';
EIGENSCHAFT_TO_SHORT['Fingerfertigkeit'] = 'FF';
EIGENSCHAFT_TO_SHORT['Gewandtheit'] = 'GE';
EIGENSCHAFT_TO_SHORT['Konstitution'] = 'KO';
EIGENSCHAFT_TO_SHORT['Körperkraft'] = 'KK';
