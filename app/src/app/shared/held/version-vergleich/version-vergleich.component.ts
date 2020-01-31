import {Component, OnInit} from '@angular/core';
import {Differences, VersionService} from '../version/version.service';
import {TableColumn} from '../../../lib/components/table/table.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-version-vergleich',
  templateUrl: './version-vergleich.component.html',
  styleUrls: ['./version-vergleich.component.css']
})
export class VersionVergleichComponent implements OnInit {


  public from;
  public to;

  public held: number;
  public biggestVersion: number;

  public versions;

  public differences: Differences;
  public loading = false;

  public columns: TableColumn[] = [
    {
      header: 'Name',
      field: 'name',
      type: 'string'
    },
    {
      header: 'Alt',
      field: 'oldValue',
      type: 'string'
    },
    {
      header : 'Neu',
      field: 'newValue',
      type: 'string'
    },
    {
      header: 'Kosten',
      field: 'kosten',
      type: 'string'
    },
    {
      header: 'Steigerung',
      field: 'tooltip',
      type: 'string'
    }
  ]

  public vorteilColumns: TableColumn[] = [
    {
      header: 'Name',
      field: 'name',
      type: 'string'
    },
    {
      header: 'Alt',
      field: 'oldValue',
      type: 'string'
    },
    {
      header : 'Neu',
      field: 'newValue',
      type: 'string'
    },
  ]



  public sfColumns: TableColumn[] = [
    {
      header: 'Name',
      field: 'name',
      type: 'string'
    },
    {
      header: 'Kosten',
      field: 'kosten',
      type: 'string'
    },
    {
      header : 'Steigerung',
      field: 'tooltip',
      type: 'string'
    }
  ]

  public steigernColumns: TableColumn[] = [
    {
      header: 'Name',
      field: 'name',
      type: 'string'
    },
    {
      header: 'Steigerung',
      field: 'tooltip',
      type: 'string'
    },
    {
      header: 'AP',
      field: 'ap',
      type: 'string'
    },
    {
      header: 'Lehrmeister',
      field: 'lehrmeisterTaw',
      type: 'string'
    },
    {
      header: 'Kostenmodifikator',
      field: 'modifier',
      type: 'string'
    },
    {
      header: 'Kosten (D)',
      field: 'kostenDukaten',
      type: 'string'
    },
  ]

  constructor(private versionService: VersionService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.to = parseInt(params.to, 10);
      this.held = params.id;
      this.from = parseInt(params.from, 10);
      this.onValueChange();

      this.versionService.getVersionenForHeld(this.held)
        .subscribe(versions => {
          this.biggestVersion = versions.length;
          this.versions = [];
          for (let i = 0; i < this.biggestVersion; i++) {
            this.versions.push(i + 1);
          }
        });
    });

  }

  public onValueChange() {
    if (this.from !== undefined && this.from !== this.to) {
      this.loading = true;
      this.versionService.compare(this.held, this.from, this.to)
        .subscribe(data => {
          this.differences = data;
          this.loading = false;
        });
    }
  }

}
