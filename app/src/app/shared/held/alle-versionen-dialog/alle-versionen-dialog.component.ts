import {Component, OnInit} from '@angular/core';
import {Version, VersionService} from '../version/version.service';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {TableColumn} from "../../../lib/components/table/table.component";
import {HeldDto, HeldenService} from "../../../lib/helden/helden.service";
import * as fileSaver from 'file-saver';


@Component({
  selector: 'app-alle-versionen-dialog-component',
  templateUrl: './alle-versionen-dialog.component.html',
  styleUrls: ['./alle-versionen-dialog.component.css']
})
export class AlleVersionenDialogComponent implements OnInit {


  public held: HeldDto;
  public versionen: Version[];

  public tableColumns: TableColumn[] = [
    {
      header: 'Version',
      field: 'version',
      type: 'number'
    },
    {
      header: 'Letztes Abenteuer',
      field: 'letztesAbenteuer',
      type: 'string'
    },
    {
      header: 'Datum',
      field: 'datum',
      type: 'date'
    },
    {
      header: '',
      field: 'actions',
      type: 'inline-actions',
      actions: [
        {
          name: 'open_in_browser',

          click: context => this.loadVersion(context)
        },
        {
          name: 'cloud_download',
          click: context => this.downloadVersion(context)
        }
      ]
    }
  ];

  private loadVersion(context: Version) {
    this.heldenService.loadHeld(this.held.id, context.version)
      .subscribe(() => {
        this.dialogRef.close();
        this.router.navigateByUrl('/held/pdf');
      });
  }

  private downloadVersion(context: Version) {
    this.heldenService.getHeldXml(this.held.id, context.version)
      .subscribe(xml => {
        console.log(xml);

        const blob = new Blob([xml],
          { type: 'text/plain;charset=utf-8' });


        fileSaver(blob, `${this.held.name}.xml`);

      });

}

  constructor(private versionService: VersionService, private heldenService: HeldenService, private router: Router, private dialogRef: MatDialogRef<AlleVersionenDialogComponent>) { }

  ngOnInit() {
    if (this.held) {
      this.versionService.getVersionenForHeld(this.held.id)
        .subscribe(data => this.versionen = data);
    } else {
      console.error('Version not set');
    }
  }

}
