import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarComprasVacinaComponent } from './listar-compras-vacina.component';

describe('ListarComprasVacinaComponent', () => {
  let component: ListarComprasVacinaComponent;
  let fixture: ComponentFixture<ListarComprasVacinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarComprasVacinaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarComprasVacinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
