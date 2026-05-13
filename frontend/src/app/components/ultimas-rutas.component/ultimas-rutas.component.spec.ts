import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimasRutasComponent } from './ultimas-rutas.component';

describe('UltimasRutasComponent', () => {
  let component: UltimasRutasComponent;
  let fixture: ComponentFixture<UltimasRutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UltimasRutasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UltimasRutasComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
