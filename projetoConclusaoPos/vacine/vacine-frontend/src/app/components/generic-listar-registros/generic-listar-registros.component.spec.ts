import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericListarRegistrosComponent } from './generic-listar-registros.component';

describe('ListarRegistrosComponent', () => {
  let component: GenericListarRegistrosComponent;
  let fixture: ComponentFixture<GenericListarRegistrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericListarRegistrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericListarRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
