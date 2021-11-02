import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TableauInfirmieresComponent} from './tableau-infirmieres.component';

describe('TableauInfirmieresComponent', () => {
  let component: TableauInfirmieresComponent;
  let fixture: ComponentFixture<TableauInfirmieresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableauInfirmieresComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauInfirmieresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
