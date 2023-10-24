import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPotentialDuplicateComponent } from './list-potential-duplicate.component';

describe('ListPotentialDuplicateComponent', () => {
  let component: ListPotentialDuplicateComponent;
  let fixture: ComponentFixture<ListPotentialDuplicateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListPotentialDuplicateComponent]
    });
    fixture = TestBed.createComponent(ListPotentialDuplicateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
