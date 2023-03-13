import { TestBed } from '@angular/core/testing';

import { IwiSpeechToTextService } from './iwi-speech-to-text.service';

describe('IwiSpeechToTextService', () => {
  let service: IwiSpeechToTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IwiSpeechToTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
