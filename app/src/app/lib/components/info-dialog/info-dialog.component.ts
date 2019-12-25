import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'lib-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css']
})
export class InfoDialogComponent implements OnInit {

  public text;

  constructor(public dialogRef: MatDialogRef<InfoDialogComponent>) { }

  ngOnInit() {
  }

}
