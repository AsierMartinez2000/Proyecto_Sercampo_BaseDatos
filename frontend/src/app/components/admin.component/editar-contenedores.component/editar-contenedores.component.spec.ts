import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarContenedoresComponent } from './editar-contenedores.component';

describe('EditarContenedoresComponent', () => {
  let component: EditarContenedoresComponent;
  let fixture: ComponentFixture<EditarContenedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarContenedoresComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarContenedoresComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
