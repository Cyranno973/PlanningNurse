import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRdvComponent } from './form-rdv.component';

describe('FormRdvComponent', () => {
  let component: FormRdvComponent;
  let fixture: ComponentFixture<FormRdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRdvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
