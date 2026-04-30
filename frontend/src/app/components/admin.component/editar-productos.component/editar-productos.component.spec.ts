import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProductosComponent } from './editar-productos.component';

describe('EditarProductosComponent', () => {
  let component: EditarProductosComponent;
  let fixture: ComponentFixture<EditarProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarProductosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarProductosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
