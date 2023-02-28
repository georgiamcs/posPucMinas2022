import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelacaoDosesCompradasAplicadasDescartadasComponent } from './relacao-doses-compradas-aplicadas-descartadas.component';

describe('RelacaoDosesCompradasVendidasDescartadasComponent', () => {
  let component: RelacaoDosesCompradasAplicadasDescartadasComponent;
  let fixture: ComponentFixture<RelacaoDosesCompradasAplicadasDescartadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelacaoDosesCompradasAplicadasDescartadasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelacaoDosesCompradasAplicadasDescartadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
