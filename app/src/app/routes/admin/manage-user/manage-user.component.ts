import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Gruppe, GruppenService} from 'dgo-components';
import {UserService} from './user.service';
import {NotificationService} from '../../../shared/notification.service';

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
    this.gruppenService.findAll()
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

}
