import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningPersoComponent } from './planning-perso.component';

describe('PlanningPersoComponent', () => {
  let component: PlanningPersoComponent;
  let fixture: ComponentFixture<PlanningPersoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanningPersoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningPersoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
