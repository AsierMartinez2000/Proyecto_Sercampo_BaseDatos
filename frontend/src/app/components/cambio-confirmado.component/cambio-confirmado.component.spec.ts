import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioConfirmadoComponent } from './cambio-confirmado.component';

describe('CambioConfirmadoComponent', () => {
  let component: CambioConfirmadoComponent;
  let fixture: ComponentFixture<CambioConfirmadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CambioConfirmadoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CambioConfirmadoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
