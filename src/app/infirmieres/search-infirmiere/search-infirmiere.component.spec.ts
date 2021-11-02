import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchInfirmiereComponent} from './search-infirmiere.component';

describe('SearchInfirmiereComponent', () => {
  let component: SearchInfirmiereComponent;
  let fixture: ComponentFixture<SearchInfirmiereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchInfirmiereComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInfirmiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
