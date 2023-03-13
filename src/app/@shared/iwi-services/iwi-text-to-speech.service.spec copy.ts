import { TestBed } from '@angular/core/testing';

import { IwiTextToSpeechService } from './iwi-text-to-speech.service';

describe('IwiTextToSpeechService', () => {
  let service: IwiTextToSpeechService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IwiTextToSpeechService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
