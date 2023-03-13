import { TestBed } from '@angular/core/testing';

import { IwiOpenaiGpt3Service } from './iwi-openai-gpt3.service';

describe('IwiOpenaiGpt3Service', () => {
  let service: IwiOpenaiGpt3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IwiOpenaiGpt3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
