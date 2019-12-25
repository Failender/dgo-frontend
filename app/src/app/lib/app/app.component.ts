import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RoutingService} from "../routing/routing.service";
import {MenuService} from "../menu/menu.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('menu', { static: true }) menu: ElementRef;

  constructor(private routingService: RoutingService, private menuService: MenuService) {}


  ngAfterViewInit(): void {
    this.routingService.menu = this.menu;
  }

  ngOnInit() {
  }

  public get menuItems() {
    return this.menuService.menuItems;
  }

}
