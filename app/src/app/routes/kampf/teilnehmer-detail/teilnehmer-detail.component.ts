import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Distanzklasse, Kampf, KampfService, Kampfteilnehmer} from '../kampf.service';
import {Subject} from 'rxjs';
import {debounceTime, flatMap, takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'app-teilnehmer-detail',
  templateUrl: './teilnehmer-detail.component.html',
  styleUrls: ['./teilnehmer-detail.component.css']
})
export class TeilnehmerDetailComponent implements OnInit, OnDestroy {


  public addIni = 'true';
  public iniButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  private takeUntil = new Subject();

  @Input()
  public teilnehmer: Kampfteilnehmer;

  @Input()
  public kampf: Kampf;

  @Output()
  public kampfChange = new EventEmitter<Kampf>();

  public teilnehmerChange = new Subject();

  constructor(private kampfService: KampfService) { }

  ngOnInit() {
    this.teilnehmerChange
      .pipe(debounceTime(500),
        tap(() => console.debug(this.kampf)),
        takeUntil(this.takeUntil),
        flatMap(() => this.kampfService.updateKampf(this.kampf)))
      .subscribe((kampf) => {
        this.kampf = kampf;
        //this.kampfChange.next(kampf);
      });
  }

  onIniChange(value) {

    if(this.addIni === 'false') {
      value = -value;
    }

    this.teilnehmer.iniMod += value;
    this.teilnehmer.ini += value;
    this.teilnehmerChange.next();

  }

  ngOnDestroy(): void {
    this.takeUntil.next();
  }

  public get distanzklassen() {
    const keys = Object.keys(Distanzklasse);
    return keys.slice(keys.length / 2);
  }

}
