import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudDescarteVacinaComponent } from './crud-descarte-vacina.component';

describe('CrudDescarteVacinaComponent', () => {
  let component: CrudDescarteVacinaComponent;
  let fixture: ComponentFixture<CrudDescarteVacinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudDescarteVacinaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudDescarteVacinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
