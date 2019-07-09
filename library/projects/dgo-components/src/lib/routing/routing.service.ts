import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {Location} from '@angular/common';
import {HeldenService} from "../helden/helden.service";


@Injectable({
  providedIn: 'root'
})
export class RoutingService {


  public menu: any;
  public currentUrl = new BehaviorSubject<string>(undefined);

  constructor(private router: Router, private location: Location, private heldenService: HeldenService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {

        let uri = event.urlAfterRedirects;
        if (uri.indexOf('held=') === -1 && this.heldenService.currentHeld) {
          uri += `?held=${this.heldenService.currentHeld.id}&version=${this.heldenService.currentHeld.version}`;
          this.location.replaceState(uri);
        }

        this.currentUrl.next(uri);
      }
    });
  }

  public closeNav() {
    this.menu.close();
  }

  public openNav() {
    this.menu.open();
  }
}

export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  hidden?: boolean
  route?: string;
  condition?: any;
  children?: NavItem[];
}

