import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FormSoignantComponent} from './form-soignant.component';

describe('FormSoignantComponent', () => {
  let component: FormSoignantComponent;
  let fixture: ComponentFixture<FormSoignantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormSoignantComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSoignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
