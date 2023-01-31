import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudVacinaComponent } from './crud-vacina.component';

describe('VacinaComponent', () => {
  let component: CrudVacinaComponent;
  let fixture: ComponentFixture<CrudVacinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudVacinaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudVacinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
