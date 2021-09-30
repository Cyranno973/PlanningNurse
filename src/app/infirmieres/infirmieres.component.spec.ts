import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfirmieresComponent } from './infirmieres.component';

describe('InfirmieresComponent', () => {
  let component: InfirmieresComponent;
  let fixture: ComponentFixture<InfirmieresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfirmieresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfirmieresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
