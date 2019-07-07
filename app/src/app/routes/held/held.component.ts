import {HeldDaten, HeldenService, HeldInfo} from 'dgo-components';
import {OnInit} from '@angular/core';
import {Router} from '@angular/router';

export abstract class HeldComponent implements OnInit {


  constructor(protected heldenService: HeldenService, protected router: Router) {

  }

  ngOnInit(): void {
    if (!this.heldenService.currentHeld) {
      this.router.navigateByUrl('/home');
      return;
    }
    this.doInit();
  }


  get held(): HeldDaten {
    return this.heldenService.heldSub.value;
  }

  get heldInfo(): HeldInfo {
    return this.heldenService.currentHeld;
  }

  abstract doInit();

}
