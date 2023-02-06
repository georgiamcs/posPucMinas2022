import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensagemFeedbackComponent } from './mensagem-feedback.component';

describe('MensagemFeedbackComponent', () => {
  let component: MensagemFeedbackComponent;
  let fixture: ComponentFixture<MensagemFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensagemFeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensagemFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
