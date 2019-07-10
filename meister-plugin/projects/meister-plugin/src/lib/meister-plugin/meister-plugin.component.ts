import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meister-plugin',
  templateUrl: './meister-plugin.component.html',
  styleUrls: ['./meister-plugin.component.scss']
})
export class MeisterPluginComponent implements OnInit {
  public people = [
    {
      name: 'William Johnson',
      birthday: new Date(1992, 2, 12)
    },
    {
      name: 'Ken Haymitch',
      birthday: new Date(1963, 6, 2)
    },
    {
      name: 'Isiah Washington',
      birthday: new Date(1956, 11, 21)
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
