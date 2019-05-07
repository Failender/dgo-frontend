import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'dgo-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  @Output() public onNavigate = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }



}
