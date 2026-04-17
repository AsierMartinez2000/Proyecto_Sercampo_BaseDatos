import { TestBed } from '@angular/core/testing';

import { RecogidasService } from './recogidas.service';

describe('RecogidasService', () => {
  let service: RecogidasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecogidasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
