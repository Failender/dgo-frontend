import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, Subject} from 'rxjs';
import {flatMap, takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {TableColumn, TableEditEvent} from "../../../lib/components/table/table.component";
import {HeldenService} from "../../../lib/helden/helden.service";
import {GruppenService} from "../../../lib/gruppen.service";
import {TokenService} from "../../../authentication/token.service";

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
      typeEvaluator: column => column.editable ? 'boolean-edit' : 'boolean'
    },
    {
      header: 'Aktiv',
      field: 'active',
      typeEvaluator: column => column.editable ? 'boolean-edit' : 'boolean'
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

  constructor(private gruppenService: GruppenService, private heldenService: HeldenService, private router: Router, private tokenService: TokenService) {
  }

  ngOnInit() {
    combineLatest(this.showPrivate,
      this.showInactive,
    this.gruppenService
      .getCurrentGroup())
      .pipe(  takeUntil(this.unsubscribe),
        flatMap(([showPrivate, showInactive,  gruppe]) => this.heldenService.getHeldenInGroup(gruppe.id, showPrivate, showInactive)))
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

  public canViewAll() {
    return this.tokenService.hasPermission('VIEW_ALL');
  }

  onEdit(event: TableEditEvent) {
    if (event.column.field === 'active') {
      this.heldenService.updateActive(event.row.id, event.row.active)
        .subscribe();
    } else if (event.column.field === 'public') {
      this.heldenService.updatePublic(event.row.id, event.row.public)
        .subscribe();
    }
  }



}
