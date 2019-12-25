import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HeldenService} from "../../../lib/helden/helden.service";

@Component({
  selector: 'app-quicknav',
  templateUrl: './quicknav.component.html',
  styleUrls: ['./quicknav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuicknavComponent implements OnInit {

  constructor(private route: ActivatedRoute, private heldenService: HeldenService) { }

  ngOnInit() {


  }

  public activate(route) {
    const startIdx = window.location.href.indexOf('/held');
    const endIdx = window.location.href.indexOf('?');

    return window.location.href.substr(startIdx, endIdx - startIdx) === route;;
  }

  public hasZauber() {
    return this.heldLoaded() && this.heldenService.activeHeld().zauberliste.zauber.length !== 0;
  }

  public hasZauberSpeicher() {
    return this.heldenService.hasSonderfertigkeit('Stabzauber: Zauberspeicher')
  }

  private heldLoaded() {
    return this.heldenService.currentHeld;
  }

}
