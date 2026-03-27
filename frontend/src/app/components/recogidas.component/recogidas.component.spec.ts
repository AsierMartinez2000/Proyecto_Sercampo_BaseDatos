import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecogidasComponent } from './recogidas.component';

describe('RecogidasComponent', () => {
  let component: RecogidasComponent;
  let fixture: ComponentFixture<RecogidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecogidasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecogidasComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
