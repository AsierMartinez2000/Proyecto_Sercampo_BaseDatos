import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimasRecogidasComponent } from './ultimas-recogidas.component';

describe('UltimasRecogidasComponent', () => {
  let component: UltimasRecogidasComponent;
  let fixture: ComponentFixture<UltimasRecogidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UltimasRecogidasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UltimasRecogidasComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
