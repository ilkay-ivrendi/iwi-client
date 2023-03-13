import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IwiTextToSpeechService {
  private synth = window.speechSynthesis;

  constructor() {
    if ('speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  speak(text: string) {
    if (!this.synth) {
      console.error('Speech synthesis is not supported by your browser.');
      return;
    }

    setTimeout(() => {
      console.log(window.speechSynthesis.getVoices());
      const voices = this.synth.getVoices();
      console.log('Voices', voices, this.synth);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voices.find((voice) => voice.name === 'Microsoft Zira - English (United States)') || null;
      utterance.pitch = 1;
      utterance.rate = 1;
      utterance.volume = 1;
      console.log('text', text);
      this.synth.speak(utterance);
    }, 2000);
  }

  cancel() {
    this.synth.cancel();
  }

  pause() {
    this.synth.pause();
  }

  resume() {
    this.synth.resume();
  }
}
