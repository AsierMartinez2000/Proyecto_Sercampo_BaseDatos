import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarComponent } from './modificar.component';

describe('ModificarComponent', () => {
  let component: ModificarComponent;
  let fixture: ComponentFixture<ModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
