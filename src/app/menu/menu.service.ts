import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, merge, Subject} from 'rxjs';
import {NavItem} from './routing.service';
import {HeldenService} from '../held/helden.service';
import {filter} from 'rxjs/operators';
import {TokenService} from '../authentication/token.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private items: NavItem[] = [
    {
      displayName: 'Meine Helden',
      iconName: '',
      route: 'meine-helden',
      condition: this.authenticated.bind(this)
    },
    {
      displayName: 'Held',
      condition: this.heldLoaded.bind(this),
      iconName: '',
      children: [
        {
          displayName: 'Übersicht',
          iconName: '',
          route: 'held/uebersicht'
        },
        {
          displayName: 'Zauber',
          iconName: '',
          route: 'held/zauber',
          condition: this.hasZauber.bind(this)
        }
      ]
    },
    {
      displayName: 'Administration',
      iconName: '',
      route: 'administration/manage-user',
      condition:  () => this.permission('CREATE_USER')
    },
  ];

  private menuItemsSubject = new BehaviorSubject(this.items);
  public menuItems = this.menuItemsSubject.asObservable();


  private authenticated() {
    return this.tokenService.isAuthenticated();
  }

  private heldLoaded() {
    return this.heldenService.currentHeld;
  }

  private permission(permission: string) {
    return this.tokenService.permissions.indexOf(permission) !== -1;
  }

  private hasZauber() {
    return this.heldLoaded() && this.heldenService.activeHeld().zauberliste.zauber.length !== 0;
  }


  constructor(private heldenService: HeldenService, private tokenService: TokenService) {
    merge(this.heldenService.heldSub
      .pipe(filter(value => !!value)), this.tokenService.tokenObs)
      .subscribe(() => {
        this.checkItemsVisiblity();
      });
    this.checkItemsVisiblity();
  }

  private checkItemsVisiblity() {
    this.items.forEach(item => this.checkItemsVisibility(item));
    this.menuItemsSubject.next(this.items);
  }

  private checkItemsVisibility(item: NavItem) {
    if (item.condition) {
      item.hidden = !item.condition();
    }
    if (item.children) {
      item.children.forEach(child => this.checkItemsVisibility(child));
    }
  }
}
