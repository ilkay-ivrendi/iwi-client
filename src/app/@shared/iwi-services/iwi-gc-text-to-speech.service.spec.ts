import { TestBed } from '@angular/core/testing';

import { IwiGcTextToSpeechService } from './iwi-gc-text-to-speech.service';

describe('IwiGcTextToSpeechService', () => {
  let service: IwiGcTextToSpeechService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IwiGcTextToSpeechService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
