import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacinaComponent } from './vacina.component';

describe('VacinaComponent', () => {
  let component: VacinaComponent;
  let fixture: ComponentFixture<VacinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacinaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
