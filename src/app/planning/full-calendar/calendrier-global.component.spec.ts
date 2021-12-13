import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierGlobalComponent } from './calendrier-global.component';

describe('FullCalendarComponent', () => {
  let component: CalendrierGlobalComponent;
  let fixture: ComponentFixture<CalendrierGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendrierGlobalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendrierGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
