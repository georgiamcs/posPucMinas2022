import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudComLookupComponent } from './crud-com-lookup.component';

describe('CrudComLookupComponent', () => {
  let component: CrudComLookupComponent;
  let fixture: ComponentFixture<CrudComLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudComLookupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudComLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
