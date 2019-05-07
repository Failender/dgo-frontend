import {
  Component,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private component;

  constructor() {}

  ngOnInit() {
  }


}
