import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericPageFormComponent } from './generic-page-form.component';

describe('GenericPageFormComponent', () => {
  let component: GenericPageFormComponent;
  let fixture: ComponentFixture<GenericPageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericPageFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericPageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
