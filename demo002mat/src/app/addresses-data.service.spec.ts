import { TestBed } from '@angular/core/testing';

import { AddressesDataService } from './addresses-data.service';

describe('AddressesDataService', () => {
  let service: AddressesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
