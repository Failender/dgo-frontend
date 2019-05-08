import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {NavItem} from './routing.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

    private navItems: NavItem[] = [
    {
      displayName: 'Meine Helden',
      iconName: 'home',
      route: 'meine-helden'
    }
  ];

  private menuItemsSubject = new BehaviorSubject(this.navItems);
  public menuItems = this.menuItemsSubject.asObservable();



  constructor() {
  }
}
