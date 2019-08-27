import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, Subject} from 'rxjs';
import {GruppenService, HeldenService} from 'dgo-components';
import {flatMap, takeUntil} from 'rxjs/operators';
import {TableColumn} from 'dgo-components';
import {Router} from '@angular/router';

@Component({
  selector: 'app-gruppe',
  templateUrl: './gruppe.component.html',
  styleUrls: ['./gruppe.component.css']
})
export class GruppeComponent implements OnInit, OnDestroy {


  private unsubscribe = new Subject();

  private showPrivate = new BehaviorSubject(false);
  private showInactive = new BehaviorSubject(false);
  public helden;

  public tableColumns: TableColumn[] = [
    {
      header: 'Name',
      field: 'name',
      type: 'string'
    },
    {
      header: 'Gruppe',
      field: 'gruppe',
      type: 'string'
    },
    {
      header: 'Letzte Änderung',
      field: 'lastChange',
      type: 'string'
    },
    {
      header: 'Version',
      field: 'version',
      type: 'string'
    },
    {
      header: 'Öffentlich',
      field: 'public',
      type: 'boolean-edit'
    },
    {
      header: 'Aktiv',
      field: 'active',
      type: 'boolean-edit'
    },
    {
      header: '',
      field: 'actions',
      type: 'actions',
      actions: [{
        name: 'Held laden',
        click: context => this.loadHeld(context)
      }]
    }
  ];

  constructor(private gruppenService: GruppenService, private heldenService: HeldenService, private router: Router) {
  }

  ngOnInit() {
    combineLatest(this.showPrivate,
      this.showInactive,
    this.gruppenService
      .getCurrentGroup())
      .pipe(  takeUntil(this.unsubscribe),
        flatMap(([showPrivate,showInactive,  gruppe]) => this.heldenService.getHeldenInGroup(gruppe.id, showPrivate, showInactive)))
      .subscribe(helden => this.helden = helden);

  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }

  private loadHeld(context) {
    this.heldenService.loadHeld(context.id, context.version)
      .subscribe(() => {
        this.router.navigateByUrl('/held/pdf');
      });
  }

  public onPrivateSliderChange(value) {
    this.showPrivate.next(value);
  }

  public onActiveSliderChange(value) {
    this.showInactive.next(value);
  }



}
