import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalenteComponent } from './talente.component';

describe('TalenteComponent', () => {
  let component: TalenteComponent;
  let fixture: ComponentFixture<TalenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
