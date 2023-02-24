import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudVacinacaoComponent } from './crud-vacinacao.component';

describe('CrudVacinacaoComponent', () => {
  let component: CrudVacinacaoComponent;
  let fixture: ComponentFixture<CrudVacinacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudVacinacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudVacinacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
