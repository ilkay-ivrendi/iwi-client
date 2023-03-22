import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '@shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeSceneComponent } from './home-scene/home-scene.component';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, IonicModule, HomeRoutingModule],
  declarations: [HomeComponent, HomeSceneComponent],
})
export class HomeModule {}
