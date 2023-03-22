import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { LoaderComponent } from './components/loader/loader.component';
import { MatrixBackgroundComponent } from './components/matrix-background/matrix-background.component';
import { MicCanvasComponent } from './components/mic-canvas/mic-canvas.component';

@NgModule({
  imports: [IonicModule, TranslateModule, CommonModule],
  declarations: [LoaderComponent, MatrixBackgroundComponent, MicCanvasComponent],
  exports: [LoaderComponent, MatrixBackgroundComponent, MicCanvasComponent],
})
export class SharedModule {}
