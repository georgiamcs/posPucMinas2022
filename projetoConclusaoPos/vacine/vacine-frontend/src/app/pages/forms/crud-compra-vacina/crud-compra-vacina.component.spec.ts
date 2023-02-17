import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudCompraComponent } from './crud-compra-vacina.component';

describe('CrudCompraComponent', () => {
  let component: CrudCompraComponent;
  let fixture: ComponentFixture<CrudCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudCompraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
