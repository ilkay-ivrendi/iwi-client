import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { I18nModule } from '@app/i18n';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login.component';
import { SharedModule } from '@app/@shared';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    IonicModule,
    I18nModule,
    AuthRoutingModule,
    SharedModule,
  ],
  declarations: [LoginComponent],
})
export class AuthModule {}
