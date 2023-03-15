import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { LoaderComponent } from './components/loader/loader.component';
import { MatrixBackgroundComponent } from './components/matrix-background/matrix-background.component';

@NgModule({
  imports: [IonicModule, TranslateModule, CommonModule],
  declarations: [LoaderComponent, MatrixBackgroundComponent],
  exports: [LoaderComponent, MatrixBackgroundComponent],
})
export class SharedModule {}
