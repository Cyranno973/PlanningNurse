import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvBadgeComponent } from './rdv-badge.component';

describe('RdvWrapperComponent', () => {
  let component: RdvBadgeComponent;
  let fixture: ComponentFixture<RdvBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdvBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdvBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
