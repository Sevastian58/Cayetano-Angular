import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCitaComponent } from './search-cita.component';

describe('SearchCitaComponent', () => {
  let component: SearchCitaComponent;
  let fixture: ComponentFixture<SearchCitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchCitaComponent]
    });
    fixture = TestBed.createComponent(SearchCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
