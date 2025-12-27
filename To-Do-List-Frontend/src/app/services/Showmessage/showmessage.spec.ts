import { TestBed } from '@angular/core/testing';

import { Showmessage } from './showmessage';

describe('Showmessage', () => {
  let service: Showmessage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Showmessage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
