import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IwiWorldRoutingModule } from './iwi-world-routing.module';
import { IwiWorldComponent } from './iwi-world.component';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { HomeSceneComponent } from '@app/home/home-scene/home-scene.component';

@NgModule({
  declarations: [IwiWorldComponent],
  imports: [CommonModule, TranslateModule, IonicModule, IwiWorldRoutingModule],
})
export class IwiWorldModule {}
