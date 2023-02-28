import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelacaoValoresComprasVendasComponent } from './relacao-valores-compras-vendas.component';

describe('RelacaoValoresComprasVendasComponent', () => {
  let component: RelacaoValoresComprasVendasComponent;
  let fixture: ComponentFixture<RelacaoValoresComprasVendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelacaoValoresComprasVendasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelacaoValoresComprasVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
