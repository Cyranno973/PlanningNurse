import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TableauSoignantComponent} from './tableau-soignant.component';

describe('TableauSoignantComponent', () => {
  let component: TableauSoignantComponent;
  let fixture: ComponentFixture<TableauSoignantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableauSoignantComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauSoignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
