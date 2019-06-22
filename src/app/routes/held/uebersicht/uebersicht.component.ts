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


  public lepButtons = [1,2,3,4,5,6,7,8,9];

  public addLep = 'true';
  public addAsp = 'true';

  constructor(heldenService: HeldenService, router: Router, private uebersichtService: UebersichtService) {
    super(heldenService, router);
  }

  doInit() {

    if(window.innerWidth < 700) {
      this.lepButtons = [1,2,3,4,5]
    }
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

  public get hasZauber() {
    return this.heldenService.hasZauber();
  }

  public get hasFernkampf() {
    return this.held.kampfsets.kampfset[0].fernkampfwaffen.fernkampfwaffe.length !== 0
  }


  public get maxAsp() {
    return this.held.eigenschaften.astralenergie.akt;
  }

  public get maxLep() {
    return this.held.eigenschaften.lebensenergie.akt;
  }

  onAspChange(value) {

    if(this.addAsp === 'false') {
      value = -value;
    }
    this.uebersicht.asp+=value;
    this.onChange();

  }

  onLepChange(value) {


    if(this.addLep === 'false') {
      value = -value;
    }

    this.uebersicht.lep += value;
    this.onChange();

  }

  onChange() {
    this.uebersichtService.updateUebersicht(this.uebersicht)
      .subscribe();
  }

  public wundeClick(index) {

    let value = this.uebersicht.wunden[index];
    if(value === -1) {
      value = 7;
    } else{
      value -= 1;
    }
    this.uebersicht.wunden[index] = value;
    this.onChange();
  }

  public wundeRightClick(index) {
    let value = this.uebersicht.wunden[index];
    if(value <= 0) {
      value = 7;
    } else{
      value += 1;
    }
    this.uebersicht.wunden[index] = value;
    this.onChange();
    return false;
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
