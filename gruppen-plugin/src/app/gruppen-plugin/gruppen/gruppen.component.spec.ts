import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GruppenComponent } from './gruppen.component';

describe('GruppenComponent', () => {
  let component: GruppenComponent;
  let fixture: ComponentFixture<GruppenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruppenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GruppenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
