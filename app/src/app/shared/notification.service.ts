import {Injectable} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackbar: MatSnackBar) {

  }

  public info(message: string) {
    this.snackbar.open(message, 'Okay', {duration: 2000});
  }

  public error(message: string) {
    this.snackbar.open(message, 'Okay', {duration: 2000});
  }



}
