import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ZauberSpeicher} from '../zauberspeicher.service';

@Component({
  selector: 'app-zauberspeicher-execute',
  templateUrl: './zauberspeicher-execute.component.html',
  styleUrls: ['./zauberspeicher-execute.component.css']
})
export class ZauberspeicherExecuteComponent {

  public zauber: ZauberSpeicher

  constructor(public dialogRef: MatDialogRef<ZauberspeicherExecuteComponent>, @Inject(MAT_DIALOG_DATA) data) {
    console.debug(data);
    this.zauber = data;
  }

  execute() {
    this.dialogRef.close(true);
  }

}
