import { TestBed } from '@angular/core/testing';

import { AddressDsService } from './address-ds.service';

describe('AddressDsService', () => {
  let service: AddressDsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressDsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
