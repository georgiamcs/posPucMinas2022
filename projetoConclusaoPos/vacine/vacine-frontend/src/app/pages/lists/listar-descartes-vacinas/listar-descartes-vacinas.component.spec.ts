import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarDescarteVacinasComponent } from './listar-descartes-vacinas.component';

describe('ListarDescarteVacinasComponent', () => {
  let component: ListarDescarteVacinasComponent;
  let fixture: ComponentFixture<ListarDescarteVacinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarDescarteVacinasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarDescarteVacinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
