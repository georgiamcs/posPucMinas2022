import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribuicaoMotivosDescarteVacinaComponent } from './distribuicao-motivos-descarte-vacina.component';

describe('DistribuicaoMotivosDescarteVacinaComponent', () => {
  let component: DistribuicaoMotivosDescarteVacinaComponent;
  let fixture: ComponentFixture<DistribuicaoMotivosDescarteVacinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistribuicaoMotivosDescarteVacinaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistribuicaoMotivosDescarteVacinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
