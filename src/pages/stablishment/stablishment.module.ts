import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StablishmentPage } from './stablishment';

@NgModule({
  declarations: [
    StablishmentPage,
  ],
  imports: [
    IonicPageModule.forChild(StablishmentPage),
  ],
  exports: [
    StablishmentPage
  ]
})
export class StablishmentPageModule {}
