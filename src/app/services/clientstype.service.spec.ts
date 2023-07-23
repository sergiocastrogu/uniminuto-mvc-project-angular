import { TestBed } from '@angular/core/testing';

import { ClientstypeService } from './clientstype.service';

describe('ClientstypeService', () => {
  let service: ClientstypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientstypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
