import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {NavItem} from './routing.service';
import {HeldenService} from '../held/helden.service';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private navItems: NavItem[] = [
    {
      displayName: 'Meine Helden',
      iconName: '',
      route: 'meine-helden'
    }
  ];

  private heldItem: NavItem = {
    displayName: 'Held',
    iconName: '',
    children: [
      {
        displayName: 'Übersicht',
        iconName: '',
        route: 'held/uebersicht'
      }
    ]
  }



  private menuItemsSubject = new BehaviorSubject(this.navItems);
  public menuItems = this.menuItemsSubject.asObservable();



  constructor(private heldenService: HeldenService) {
    this.heldenService.heldSub
      .pipe(filter(value => !!value))
      .subscribe(held => {
        if (this.heldItem) {
          this.navItems.push(this.heldItem);
          this.heldItem = null;
        }
      })
  }
}
