import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessoProibidoComponent } from './acesso-proibido.component';

describe('AcessoProibidoComponent', () => {
  let component: AcessoProibidoComponent;
  let fixture: ComponentFixture<AcessoProibidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcessoProibidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcessoProibidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
