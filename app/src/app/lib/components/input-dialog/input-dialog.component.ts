import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'dgo-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.css']
})
export class InputDialogComponent implements OnInit {


  public fields: Field[];

  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<InputDialogComponent>) { }

  ngOnInit() {
    const controls = {};
    this.fields.forEach(field => {

      controls[field.name] = new FormControl(null, Validators.required);
    });

    this.form = new FormGroup(controls);

  }

  submit() {
    this.dialogRef.close(this.form.value);
  }

}

export interface Field {
  name: string;
  label: string;
  type: string;
}
