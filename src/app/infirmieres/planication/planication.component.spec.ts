import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlanicationComponent} from './planication.component';

describe('PlanicationComponent', () => {
  let component: PlanicationComponent;
  let fixture: ComponentFixture<PlanicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanicationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
