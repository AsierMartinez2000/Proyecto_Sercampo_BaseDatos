import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonasComponent } from './zonas.component';

describe('ZonasComponent', () => {
  let component: ZonasComponent;
  let fixture: ComponentFixture<ZonasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZonasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZonasComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
