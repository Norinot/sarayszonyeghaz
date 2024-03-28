import { TestBed } from '@angular/core/testing';

import { MessageUsHttpServiceService } from './messageUs-http-service.service';

describe('MessageUsHttpServiceService', () => {
  let service: MessageUsHttpServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageUsHttpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
