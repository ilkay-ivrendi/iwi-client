import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matrix-background',
  templateUrl: './matrix-background.component.html',
  styleUrls: ['./matrix-background.component.scss'],
})
export class MatrixBackgroundComponent implements OnInit {
  canvas: any;
  canvasCtx: any;
  canvasWidth = 1200;
  canvasHeight = 100;
  font_size = 10;
  matrix_code = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}';
  matrix: any;
  drops: any = [];
  columns: any;

  constructor() {}

  ngOnInit(): void {
    this.getCanvas();
  }

  getCanvas() {
    // Log success message to console
    console.log('Matrix Starts:');

    // Initialize canvas context
    this.canvas = document.getElementById('matrix-canvas') as HTMLCanvasElement;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight / 2;
    this.canvasCtx = this.canvas.getContext('2d');
    this.matrix = this.matrix_code.split('');
    var columns = this.canvas.width / this.font_size; //number of columns for the rain
    for (var x = 0; x < columns; x++) {
      this.drops[x] = 1;
    }
    setInterval(() => this.draw(this.canvas), 46);
  }

  draw(canvas: any) {
    //Black BG for the canvas
    //translucent BG to show trail

    this.canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    this.canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    this.canvasCtx.fillStyle = '#3880ff'; //green text
    this.canvasCtx.font = this.font_size + 'px arial';
    //looping over drops

    //an array of drops - one per column
    //x below is the x coordinate
    //1 = y co-ordinate of the drop(same for every drop initially)

    for (var i = 0; i < this.drops.length; i++) {
      //a random chinese character to print
      var text = this.matrix[Math.floor(Math.random() * this.matrix.length)];
      //x = i*font_size, y = value of drops[i]*font_size
      this.canvasCtx.fillText(text, i * this.font_size, this.drops[i] * this.font_size);

      //sending the drop back to the top randomly after it has crossed the screen
      //adding a randomness to the reset to make the drops scattered on the Y axis
      if (this.drops[i] * this.font_size > canvas.height && Math.random() > 0.975) this.drops[i] = 0;

      //incrementing Y coordinate
      this.drops[i]++;
    }
  }
}
