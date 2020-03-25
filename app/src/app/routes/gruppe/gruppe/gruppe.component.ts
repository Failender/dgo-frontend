import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, Subject} from 'rxjs';
import {flatMap, takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {TableColumn, TableEditEvent} from "../../../lib/components/table/table.component";
import {HeldDto, HeldenService} from "../../../lib/helden/helden.service";
import {GruppenService} from "../../../lib/gruppen.service";
import {TokenService} from "../../../authentication/token.service";
import {AlleVersionenDialogComponent} from '../../../shared/held/alle-versionen-dialog/alle-versionen-dialog.component';
import {MatDialog} from '@angular/material/dialog';

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



  public tableColumns: TableColumn[] = this.buildColumns();



  constructor(private gruppenService: GruppenService, private heldenService: HeldenService, private router: Router, private tokenService: TokenService,
              private dialog: MatDialog) {
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

  private compareWithVersion(context: HeldDto) {
    this.router.navigateByUrl(`/held/vergleich/${context.id}/${context.version - 1}/${context.version}`);

  }

  private showAllVersions(context) {
    const dialogRef = this.dialog.open(AlleVersionenDialogComponent, {minWidth: '100vw'})
    dialogRef.componentInstance.held = context;

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

  private buildColumns() {
    const columns = [];
    columns.push({
      header: 'Name',
      field: 'name',
      type: 'string'
    });

    if (window.innerWidth > 1000) {
      columns.push({
        header: 'Letzte Änderung',
        field: 'lastChange',
        type: 'string'
      });
    }

    columns.push(...[{
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
        actions: [
          {
            name: 'Held laden',
            click: context => this.loadHeld(context)
          },
          {
            name: 'Alle Versionen anzeigen',
            click: context => this.showAllVersions(context)
          },
          {
            name: 'Mit voriger Version vergleichen',
            click: context => this.compareWithVersion(context)
          }
        ]
      }]);
    return columns;
  }



}
