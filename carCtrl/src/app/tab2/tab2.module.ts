import { InfoCarComponent } from './../modals/info-car/info-car.component';
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
import { TradeCarComponent } from '../modals/trade-car/trade-car.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    TranslateModule,
    ComponentsModule,
  ],
  declarations: [
    Tab2Page,
    CreateCarComponent,
    UpdateCarComponent,
    InfoCarComponent,
    TradeCarComponent,
  ],
  entryComponents: [
    CreateCarComponent,
    UpdateCarComponent,
    InfoCarComponent,
    TradeCarComponent,
  ],
})
export class Tab2PageModule {}
