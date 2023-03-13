import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, Platform } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { forkJoin, from, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { IwiSpeechToTextService, IwiTextToSpeechService, Logger, UntilDestroy, untilDestroyed } from '@shared';
import { AuthenticationService } from './authentication.service';

const log = new Logger('Login');

declare function start_matrix(): any;

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;
  mediaStream: any;
  audioContext: any;
  analyser: any;
  bufferLength: any;
  dataArray: any;
  canvasCtx: any;
  canvasWidth = 500;
  canvasHeight = 100;
  rafId: number = 0;

  transcription$: Observable<string> = this.speechToText.transcription$;

  // Put variables in global scope to make them available to the browser console.
  constraints = {
    audio: false,
    video: true,
  };
  errorString = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private platform: Platform,
    private loadingController: LoadingController,
    private authenticationService: AuthenticationService,
    private textToSpeech: IwiTextToSpeechService,
    private speechToText: IwiSpeechToTextService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.audioContext = new AudioContext();
    start_matrix();
    this.getMedia();
    this.welcomMessage();
    this.startListening();
  }

  async login() {
    this.isLoading = true;
    const login$ = this.authenticationService.login(this.loginForm.value);
    const loadingOverlay = await this.loadingController.create({});
    const loading$ = from(loadingOverlay.present());
    forkJoin([login$, loading$])
      .pipe(
        map(([credentials, ...rest]) => credentials),
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
          loadingOverlay.dismiss();
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (credentials) => {
          log.debug(`${credentials.username} successfully logged in`);
          this.router.navigate([this.route.snapshot.queryParams['redirect'] || '/'], { replaceUrl: true });
        },
        (error) => {
          log.debug(`Login error: ${error}`);
          this.error = error;
        }
      );
  }

  get isWeb(): boolean {
    return !this.platform.is('cordova');
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true,
    });
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
      this.analyser.fftSize = 256;
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

  welcomMessage() {
    const message = 'Welcome, I am Kai. You can choice to sign up by saying sign up or introduce';
    this.textToSpeech.speak(message);
  }

  startListening() {
    console.log('I am listening!');
    this.speechToText.startListening();
  }
}
