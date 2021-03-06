import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from './user.service';
import {NotificationService} from '../../../shared/notification.service';
import {Gruppe, GruppenService} from "../../../lib/gruppen.service";

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {



  public creatingUser = false;
  public gruppen: Gruppe[];
  public createForm = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    gruppe: new FormControl('', Validators.required),

    token: new FormControl(''),

  })

  constructor(private gruppenService: GruppenService, private userService: UserService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.gruppenService.getAll()
      .subscribe(data => this.gruppen = data);
  }

  createUser() {
    this.creatingUser = true;
    this.userService.createUser(this.createForm.value).subscribe(response => {
        this.notificationService.info('Nutzer wurde angelegt')
        this.creatingUser = false;
      }, err => {
        this.creatingUser = false;
        this.notificationService.info('Fehler beim Anlegen des Nutzers');
      });
  }

  fileChange(event) {
    const files = event.target.files;
    if (files.length === 1) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = fileObj => {
        const contents: any = fileObj.target;
        const text = contents.result;

        this.notificationService.info('Nutzer werden erstellt..')
        this.userService.createUsers(text)
          .subscribe(
            () => this.notificationService.info('Nutzer wurden erstellt')
          );
      }
      reader.readAsText(file);
    }
  }

}
