import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HeldenService} from '../../../held/helden.service';

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

  private activate(route) {
    const startIdx = window.location.href.indexOf('/held');
    const endIdx = window.location.href.indexOf('?');

    return window.location.href.substr(startIdx, endIdx - startIdx) === route;;
  }

  private hasZauber() {
    return this.heldLoaded() && this.heldenService.activeHeld().zauberliste.zauber.length !== 0;
  }

  private heldLoaded() {
    return this.heldenService.currentHeld;
  }

}
