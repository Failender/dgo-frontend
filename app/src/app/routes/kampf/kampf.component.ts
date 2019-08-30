import {Component, OnDestroy, OnInit} from '@angular/core';
import {KampfService} from './kampf.service';
import {GruppenService} from 'dgo-components';
import {NEVER, never, Subject} from 'rxjs';
import {catchError, flatMap, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-kampf',
  templateUrl: './kampf.component.html',
  styleUrls: ['./kampf.component.css']
})
export class KampfComponent implements OnInit, OnDestroy {

  private destroy = new Subject();

  constructor(private kampfService: KampfService, private gruppenService: GruppenService) { }

  public kampf;

  ngOnInit() {
    this.gruppenService
      .getCurrentGroup()
      .pipe(flatMap(gruppe => this.kampfService.getKampf(gruppe.id)), catchError(err => NEVER), takeUntil(this.destroy))
      .subscribe(kampf => this.kampf = kampf);
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  public nextTeilnehmer() {

    this.kampfService
      .nextTeilnehmer(this.gruppenService.currentGroup.value.id)
      .subscribe(kampf => this.kampf = kampf);

  }

}
