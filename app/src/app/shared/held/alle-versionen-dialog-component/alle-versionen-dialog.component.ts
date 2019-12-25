import {Component, OnInit} from '@angular/core';
import {Version, VersionService} from '../version/version.service';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material';
import {TableColumn} from "../../../lib/components/table/table.component";
import {HeldenService} from "../../../lib/helden/helden.service";

@Component({
  selector: 'app-alle-versionen-dialog-component',
  templateUrl: './alle-versionen-dialog.component.html',
  styleUrls: ['./alle-versionen-dialog.component.css']
})
export class AlleVersionenDialogComponent implements OnInit {


  public held: number;
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
        }
      ]
    }
  ];

  private loadVersion(context: Version) {
    this.heldenService.loadHeld(this.held, context.version)
      .subscribe(() => {
        this.dialogRef.close();
        this.router.navigateByUrl('/held/pdf');
      });
  }

  constructor(private versionService: VersionService, private heldenService: HeldenService, private router: Router, private dialogRef: MatDialogRef<AlleVersionenDialogComponent>) { }

  ngOnInit() {
    if (this.held) {
      this.versionService.getVersionenForHeld(this.held)
        .subscribe(data => this.versionen = data);
    } else {
      console.error('Version not set');
    }
  }

}
