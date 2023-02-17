import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemRegistrosComponent } from './sem-registros.component';

describe('SemRegistrosComponent', () => {
  let component: SemRegistrosComponent;
  let fixture: ComponentFixture<SemRegistrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemRegistrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
