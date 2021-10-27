import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchSoignantComponent} from './search-soignant.component';

describe('SearchInfirmiereComponent', () => {
  let component: SearchSoignantComponent;
  let fixture: ComponentFixture<SearchSoignantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchSoignantComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSoignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
