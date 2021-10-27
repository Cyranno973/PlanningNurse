import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoignantsComponent } from './soignants.component';

describe('InfirmieresComponent', () => {
  let component: SoignantsComponent;
  let fixture: ComponentFixture<SoignantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoignantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoignantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
