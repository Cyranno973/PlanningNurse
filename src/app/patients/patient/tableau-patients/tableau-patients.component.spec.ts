import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TableauPatientsComponent} from './tableau-patients.component';

describe('TableauPatientsComponent', () => {
  let component: TableauPatientsComponent;
  let fixture: ComponentFixture<TableauPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableauPatientsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
