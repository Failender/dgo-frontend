import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-fantasy-grounds',
  templateUrl: './fantasy-grounds.component.html',
  styleUrls: ['./fantasy-grounds.component.css']
})
export class FantasyGroundsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public fileChange(event) {

  }

  public get uploadUrl() {
    return environment.rest + 'fantasygrounds';
  }

}
