import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Kampf, KampfService, Kampfteilnehmer} from './kampf.service';
import {GruppenService} from 'dgo-components';
import {NEVER, Subject} from 'rxjs';
import {catchError, debounce, debounceTime, flatMap, takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'app-kampf',
  templateUrl: './kampf.component.html',
  styleUrls: ['./kampf.component.css']
})
export class KampfComponent implements OnInit, OnDestroy {

  private destroy = new Subject();

  public selectedTeilnehmer: Kampfteilnehmer;
  private kampfChanged = new Subject();
  public loading = false;


  public iniButtons = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
  constructor(private kampfService: KampfService, private gruppenService: GruppenService) { }

  public kampf: Kampf;

  ngOnInit() {
    this.gruppenService
      .getCurrentGroup()
      .pipe(flatMap(gruppe => this.kampfService.getKampf(gruppe.id)), catchError(err => NEVER), takeUntil(this.destroy))
      .subscribe(kampf => this.setKampf(kampf));

    this.kampfChanged
      .pipe(debounceTime(2000), takeUntil(this.destroy),
        tap(() => this.loading = true),
        flatMap(() => this.kampfService.updateKampf(this.kampf)))
      .subscribe(kampf => {
        this.setKampf(kampf);
        this.loading = false;
    });
  }

  @HostListener('keydown', ['$event'])
  public onKeyDown(event) {
    console.debug(event);

    if (!event.ctrlKey) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    if (event.key === 'n') {
      this.nextTeilnehmer();
    }

    return false;
  }

  public selectTeilnehmer(teilnehmer: Kampfteilnehmer) {
    this.selectedTeilnehmer = teilnehmer;
  }

  private setKampf(kampf: Kampf) {
    this.kampf = kampf;
    this.selectedTeilnehmer = kampf.teilnehmer[kampf.currentTeilnehmer];
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  public nextTeilnehmer() {

    this.kampfService
      .nextTeilnehmer(this.gruppenService.currentGroup.value.id)
      .subscribe(kampf => this.setKampf(kampf));

  }

  public halten() {
    this.kampfService
      .halten(this.gruppenService.currentGroup.value.id)
      .subscribe(kampf => this.setKampf(kampf));

  }

  changeIni(amount: number, teilnehmer: Kampfteilnehmer) {
    teilnehmer.iniMod += amount;
    teilnehmer.ini += amount;
    this.kampfChanged.next();
  }

  public at(teilnehmer: Kampfteilnehmer) {
    this.kampfService
      .at(this.gruppenService.currentGroup.value.id, teilnehmer.id)
      .subscribe(kampf => this.setKampf(kampf));
  }

  public pa(teilnehmer: Kampfteilnehmer) {
    this.kampfService
      .pa(this.gruppenService.currentGroup.value.id, teilnehmer.id)
      .subscribe(kampf => this.setKampf(kampf));
  }

  public findTeilnehmer(id: number): Kampfteilnehmer {
    return this.kampf.teilnehmer.find(entry => entry.id === id);
  }

  public removeKampf() {
    this.kampfService.removeKampf(this.kampf.gruppe)
      .subscribe(() => this.kampf = null);
  }


}
