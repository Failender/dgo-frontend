import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-quicknav',
  templateUrl: './quicknav.component.html',
  styleUrls: ['./quicknav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuicknavComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {


  }

  private activate(route) {
    const startIdx = window.location.href.indexOf('/held');
    const endIdx = window.location.href.indexOf('?');

    return window.location.href.substr(startIdx, endIdx - startIdx) === route;;
  }

}
