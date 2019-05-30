import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';

@Component({
  selector: 'app-quicknav',
  templateUrl: './quicknav.component.html',
  styleUrls: ['./quicknav.component.css']
})
export class QuicknavComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {


  }

  private activate(route) {
    return window.location.href.indexOf(route) !== -1;
  }

}
