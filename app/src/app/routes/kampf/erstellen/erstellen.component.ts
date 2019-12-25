import {Component, OnDestroy, OnInit} from '@angular/core';
import {Kampf, KampfService} from '../kampf.service';
import {from, Subject} from 'rxjs';
import {flatMap, takeUntil, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {GruppenService} from "../../../lib/gruppen.service";
import {HeldDaten, HeldenService} from "../../../lib/helden/helden.service";

@Component({
  selector: 'app-erstellen',
  templateUrl: './erstellen.component.html',
  styleUrls: ['./erstellen.component.css']
})
export class ErstellenComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject();

  public kampf: Kampf = {
    teilnehmer: [],
    name: ''
  };

  constructor(private gruppenService: GruppenService, private heldenService: HeldenService, private kampfService: KampfService, private router: Router) { }


  ngOnInit() {

    this.gruppenService.getCurrentGroup()
      .pipe(
        tap(gruppe => this.kampf.gruppe = gruppe.id),
        flatMap(gruppe => this.heldenService.getHeldenInGroup(gruppe.id, false, false)),
        flatMap(helden => from(helden)),
        flatMap(held => this.heldenService.loadHeld(held.id, held.version, false)),
        takeUntil(this.unsubscribe))
      .subscribe((held: HeldDaten) => {
        const iniWurf = Math.floor(Math.random() * 6) + 1;
        this.kampf.teilnehmer.push({
          name: held.angaben.name,
          iniBasis: held.kampfsets.kampfset[0].ini,
          iniWurf
        });
      });

  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }

  addTeilnehmer() {
    this.kampf.teilnehmer.push({
      name: '',
      iniBasis: 0,
      iniWurf: 1
    });
  }

  removeTeilnehmer(index) {
    this.kampf.teilnehmer.splice(index, 1);
  }

  createKampf() {
    this.kampfService.createKampf(this.kampf)
      .subscribe(kampf => {
        this.router.navigateByUrl('kampf');
      });
  }

  kampfValid() {
    return this.iniBasisFilled();
  }

  private iniBasisFilled() {
    for (const teilnehmer of this.kampf.teilnehmer) {
      if (!teilnehmer.iniWurf) {
        return false;
      }
    }
    return true;
  }

}
