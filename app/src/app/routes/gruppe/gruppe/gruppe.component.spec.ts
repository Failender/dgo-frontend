import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GruppeComponent } from './gruppe.component';

describe('GruppeComponent', () => {
  let component: GruppeComponent;
  let fixture: ComponentFixture<GruppeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruppeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GruppeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
