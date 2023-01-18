import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { CreateCarComponent } from '../modals/create-car/create-car.component';
import { UpdateCarComponent } from '../modals/update-car/update-car.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    TranslateModule,
    ComponentsModule,
  ],
  declarations: [Tab2Page, CreateCarComponent, UpdateCarComponent],
  entryComponents: [CreateCarComponent, UpdateCarComponent],
})
export class Tab2PageModule {}
