import {Injectable} from '@angular/core';
import {BehaviorSubject, merge} from 'rxjs';
import {filter} from 'rxjs/operators';
import {NavItem} from "../routing/routing.service";
import {HeldenService} from "../helden/helden.service";
import {TokenService} from "../../authentication/token.service";


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private items: NavItem[] = [];

  public registerItem(item: NavItem) {
    this.items.push(item);
    this.checkItemsVisiblity();
  }

  private menuItemsSubject = new BehaviorSubject(this.items);
  public menuItems = this.menuItemsSubject.asObservable();


  public authenticated() {
    return this.tokenService.isAuthenticated();
  }

  public heldLoaded() {
    return this.heldenService.currentHeld;
  }

  public permission(permission: string) {
    return this.tokenService.permissions.indexOf(permission) !== -1;
  }

  public sf(sf: string) {
    if (!this.heldLoaded()) {
      return false;
    }
    return this.heldenService.activeHeld().sonderfertigkeiten.sonderfertigkeit.find(entry => entry.name === sf);

  }

  public hasZauber() {
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
