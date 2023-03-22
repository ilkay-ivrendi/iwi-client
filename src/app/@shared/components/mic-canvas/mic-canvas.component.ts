import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mic-canvas',
  templateUrl: './mic-canvas.component.html',
  styleUrls: ['./mic-canvas.component.scss'],
})
export class MicCanvasComponent implements OnInit {
  mediaStream: any;
  audioContext: any;
  analyser: any;
  bufferLength: any;
  dataArray: any;
  canvasCtx: any;
  canvasWidth = 250;
  canvasHeight = 45;
  rafId: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.audioContext = new AudioContext();
    this.getMedia();
  }

  async getMedia() {
    try {
      // Get user's audio stream
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Log success message to console
      console.log('User audio stream successfully captured:', this.mediaStream);

      // Initialize Web Audio API
      this.audioContext = new AudioContext();
      const source = this.audioContext.createMediaStreamSource(this.mediaStream);
      this.analyser = this.audioContext.createAnalyser();
      source.connect(this.analyser);
      this.analyser.fftSize = 1024;
      this.bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(this.bufferLength);

      // Initialize canvas context
      const canvas = document.getElementById('micCanvas') as HTMLCanvasElement;
      canvas.width = this.canvasWidth;
      canvas.height = this.canvasHeight;
      this.canvasCtx = canvas.getContext('2d');

      // Start animation loop
      this.animate();
    } catch (error) {
      // Log error message to console
      console.error('Error capturing user audio stream:', error);
    }
  }

  animate() {
    // Get current audio data and update canvas
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.draw();

    // Request next animation frame
    this.rafId = requestAnimationFrame(() => this.animate());
  }

  draw() {
    // Clear canvas
    this.canvasCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Draw wave-looking UI
    this.canvasCtx.lineWidth = 2;
    this.canvasCtx.strokeStyle = '#007aff';
    this.canvasCtx.beginPath();

    const sliceWidth = this.canvasWidth / this.bufferLength;
    let x = 0;

    for (let i = 0; i < this.bufferLength; i++) {
      const v = this.dataArray[i] / 128.0;
      const y = (v * this.canvasHeight) / 2;

      if (i === 0) {
        this.canvasCtx.moveTo(x, y);
      } else {
        this.canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    this.canvasCtx.lineTo(this.canvasWidth, this.canvasHeight / 2);
    this.canvasCtx.stroke();
  }

  ngOnDestroy() {
    // Stop animation loop and close audio context
    cancelAnimationFrame(this.rafId);
    this.audioContext.close();
  }
}
