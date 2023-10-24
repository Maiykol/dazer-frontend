import { TestBed } from '@angular/core/testing';

import { SubsamplingDataService } from './subsampling-data.service';

describe('SubsamplingDataService', () => {
  let service: SubsamplingDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubsamplingDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
