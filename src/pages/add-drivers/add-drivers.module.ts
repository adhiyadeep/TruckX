import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddDriversPage } from './add-drivers';

@NgModule({
  declarations: [
    AddDriversPage,
  ],
  imports: [
    IonicPageModule.forChild(AddDriversPage),
  ],
})
export class AddDriversPageModule {}
