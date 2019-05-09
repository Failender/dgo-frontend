import {HeldenService} from '../../held/helden.service';
import {OnInit} from '@angular/core';
import {Router} from '@angular/router';

export abstract class HeldComponent implements OnInit {


  constructor(protected heldenService: HeldenService, protected router: Router) {

  }

  ngOnInit(): void {
    if (this.heldenService.currentHeld === null) {
      this.router.navigateByUrl('/home');
      return;
    }
    this.doInit();
  }


  get held() {
    return this.heldenService.heldSub.value;
  }

  get heldInfo() {
    return this.heldenService.currentHeld;
  }

  abstract doInit();

}
