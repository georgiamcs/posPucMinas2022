import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelacaoDosesCompradasVendidasDescartadasComponent } from './relacao-doses-compradas-vendidas-descartadas.component';

describe('RelacaoDosesCompradasVendidasDescartadasComponent', () => {
  let component: RelacaoDosesCompradasVendidasDescartadasComponent;
  let fixture: ComponentFixture<RelacaoDosesCompradasVendidasDescartadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelacaoDosesCompradasVendidasDescartadasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelacaoDosesCompradasVendidasDescartadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
