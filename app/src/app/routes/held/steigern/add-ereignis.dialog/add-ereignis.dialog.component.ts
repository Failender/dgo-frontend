import {Component, OnInit} from '@angular/core';
import {SteigernService} from '../steigern.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-ereignis.dialog',
  templateUrl: './add-ereignis.dialog.component.html',
  styleUrls: ['./add-ereignis.dialog.component.css']
})
export class AddEreignisDialogComponent implements OnInit {

  public held;
  public form = new FormGroup({
    name: new FormControl('', Validators.required),
    ap: new FormControl('', Validators.required)
  })

  constructor(private steigernService: SteigernService, public dialogRef: MatDialogRef<AddEreignisDialogComponent>, ) { }

  ngOnInit() {
  }

  public send() {
    this.steigernService.addEreignis(this.held, this.form.value.name, this.form.value.ap)
      .subscribe(data => {
        this.dialogRef.close(data);
      });
  }

}
