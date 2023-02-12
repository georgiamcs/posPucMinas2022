import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensagemErroInputComponent } from './mensagem-erro-input.component';

describe('MensagemErroInputComponent', () => {
  let component: MensagemErroInputComponent;
  let fixture: ComponentFixture<MensagemErroInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensagemErroInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensagemErroInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
