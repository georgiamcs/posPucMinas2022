import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRegistrosComponent } from './listar-registros.component';

describe('ListarRegistrosComponent', () => {
  let component: ListarRegistrosComponent;
  let fixture: ComponentFixture<ListarRegistrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarRegistrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
