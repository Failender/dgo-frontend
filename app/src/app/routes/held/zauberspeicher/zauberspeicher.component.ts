import { Component, OnInit } from '@angular/core';
import {HeldComponent} from '../held.component';
import {HeldenService} from 'dgo-components';
import {Router} from '@angular/router';
import {TableColumn} from '../../../table/table.component';
import {ZauberspeicherService} from './zauberspeicher.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TokenService} from 'dgo-components';
import { MatDialog } from '@angular/material/dialog';
import {ZauberspeicherExecuteComponent} from './zauberspeicher-execute/zauberspeicher-execute.component';

@Component({
  selector: 'app-zauberspeicher',
  templateUrl: './zauberspeicher.component.html',
  styleUrls: ['./zauberspeicher.component.css']
})
export class ZauberspeicherComponent extends HeldComponent {

  public form = new FormGroup({
    zauber: new FormControl('', Validators.required),
    zfw: new FormControl('', Validators.required),
    kosten: new FormControl('', Validators.required),
    komplexitaet: new FormControl('', Validators.required),
    varianteMod: new FormControl(0),
    qualitaet: new FormControl('', Validators.required),
    heldid: new FormControl('', Validators.required),
    mr: new FormControl(),
    spomos: new FormControl('')
  })

  private actionColumn = {
    header: '',
    field: 'actions',
    type: 'inline-actions',
    actions: [{
      name: 'delete',
      click: context => this.deleteSpeicher(context)
    }]
  };

  public tableColumns: TableColumn[] = [
    {
      header: 'Zauber',
      field: 'zauber',
      type: 'string'
    },
    {
      header: 'ZfW',
      field: 'zfw',
      type: 'number'
    },
    {
      header: 'Kosten',
      field: 'kosten',
      type: 'string'
    },
    {
      header: 'Qualität',
      field: 'qualitaet',
      type: 'string'
    },
    {
      header: 'Komplexität',
      field: 'komplexitaet',
      type: 'string'
    },
    {
      header: 'Spontane Modifikationen',
      field: 'spomos',
      type: 'string'
    },
    this.actionColumn
  ];


  private deleteSpeicher(context) {
    const dialogRef = this.matdialog.open(ZauberspeicherExecuteComponent, {
      data: context
    })
    dialogRef.afterClosed()
      .subscribe(data => {
        if (data) {
          this.zauberspeicherService.deleteSpeicher(context.id)
            .subscribe(() => this.loadZauberspeicher());
        }
      });

  }

  public data = [];

  public zauberOptions;

  public modifikator = 0;

  private spomo(mod: number, label: string) {
    return {
      label,
      value: {
        name: label,
        mod
      }
    };
  }


  public spomos = [];
  constructor(heldenService: HeldenService, router: Router, private zauberspeicherService: ZauberspeicherService, private tokenService: TokenService,
              private matdialog: MatDialog) {
    super(heldenService, router);
    this.spomos.push(this.spomo(4, 'Zauberdauer'));
    this.spomos.push(this.spomo(-5, 'Reichweite'));
    this.spomos.push(this.spomo(-3, 'Kosten senken 10%'));
    this.spomos.push(this.spomo(-6, 'Kosten senken 20%'));
    this.spomos.push(this.spomo(-9, 'Kosten senken 30%'));
    this.spomos.push(this.spomo(-12, 'Kosten senken 40%'));
    this.spomos.push(this.spomo(-15, 'Kosten senken 50%'));


    if (this.tokenService.visiblePdfs.indexOf('lcd') !== -1) {
      this.actionColumn.actions.push({
        name: 'book',
        click: context => this.liber(context)
      });
    }
  }

  private liber(context: any) {
    const zauberName = context.zauber;
    const zauber = this.heldenService.activeHeld().zauberliste.zauber.find(entry => entry.name === zauberName);
    this.router.navigateByUrl(`/pdf/lcd/${zauber.quelle.seite}`);

  }

  doInit() {
    this.loadZauberspeicher();
    this.zauberOptions = this.held.zauberliste.zauber.map(value => {
      return {
        label: value.name,
        value: value.name
      };
    });

    this.form.controls.heldid.patchValue(this.heldenService.currentHeld.id);
  }

  private loadZauberspeicher() {
    this.zauberspeicherService.getZauberSpeicherForHeld(this.heldenService.currentHeld.id)
      .subscribe(data => this.data = data);

  }

  public zauberSelected(value) {
    const zauber = this.held.zauberliste.zauber.find(entry => entry.name === value);
    this.form.controls.komplexitaet.patchValue(zauber.komplexität);
    this.form.controls.zfw.patchValue(zauber.wert);
  }

  public spomoSelected(event) {
    this.modifikator = 0;
    const spomos = event.value.map(entry => entry.name).join(', ');
    this.form.controls.spomos.patchValue(spomos);
    event.value.forEach(entry => {
      this.modifikator += entry.mod;
    });
    if (this.modifikator < 0) {
      this.modifikator = Math.floor(this.modifikator / 2);
    }
  }

  public get totalModifikator() {

    const mr = this.form.value.mr || 0;
    return this.modifikator - this.form.value.varianteMod - mr;
  }

  addZauberspeicher() {
    this.zauberspeicherService.saveSpeicher(this.form.value)
      .subscribe(() => this.loadZauberspeicher());
  }

}
