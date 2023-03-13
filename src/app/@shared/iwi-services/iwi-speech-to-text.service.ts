import { ChangeDetectorRef, Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';

declare var webkitSpeechRecognition: any;
declare var SpeechRecognition: any;
@Injectable({
  providedIn: 'root',
})
export class IwiSpeechToTextService {
  public recognition: any;
  private transcriptionSubject = new Subject<string>();
  public transcription$ = this.transcriptionSubject.asObservable();

  isStoppedSpeechRecog = false;

  constructor() {
    if (window.hasOwnProperty('webkitSpeechRecognition')) {
      console.log('YOUR: working');
      this.recognition = new webkitSpeechRecognition();
      this.init();
    } else {
      console.log('YOUR: not working on this browser');
      return;
    }
  }

  init() {
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';
  }

  startListening() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    this.recognition.addEventListener('result', (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';

          if (transcript.toLowerCase().endsWith('question')) {
            finalTranscript = finalTranscript.slice(0, -9) + '? ';
          } else {
            finalTranscript = finalTranscript.slice(0, -1) + '. ';
          }
        } else {
          interimTranscript += transcript;
        }
      }

      // Do something with finalTranscript and interimTranscript
      this.transcriptionSubject.next(finalTranscript);
    });
  }

  stopListening() {
    this.isStoppedSpeechRecog = true;
    this.transcriptionSubject.next('Good Bye!');
    this.recognition.stop();
  }
}
