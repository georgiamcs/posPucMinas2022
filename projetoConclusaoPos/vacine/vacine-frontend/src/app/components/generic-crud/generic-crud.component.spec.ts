import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericCrudComponent } from './generic-crud.component';

describe('CrudComponent', () => {
  let component: GenericCrudComponent;
  let fixture: ComponentFixture<GenericCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
