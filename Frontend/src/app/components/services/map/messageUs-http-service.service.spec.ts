import { TestBed } from '@angular/core/testing';

import { MessageUsHttpService } from './messageUs-http-service.service';

describe('MessageUsHttpServiceService', () => {
  let service: MessageUsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageUsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
