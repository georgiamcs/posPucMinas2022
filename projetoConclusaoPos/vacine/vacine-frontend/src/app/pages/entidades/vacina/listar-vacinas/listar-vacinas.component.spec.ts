import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarVacinasComponent } from './listar-vacinas.component';

describe('ListarVacinasComponent', () => {
  let component: ListarVacinasComponent;
  let fixture: ComponentFixture<ListarVacinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarVacinasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarVacinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
