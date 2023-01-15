import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { CreateIntervencaoComponent } from '../modals/create-intervencao/create-intervencao.component';
import { UpdateIntervencaoComponent } from '../modals/update-intervencao/update-intervencao.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    TranslateModule,
  ],
  declarations: [
    Tab1Page,
    CreateIntervencaoComponent,
    UpdateIntervencaoComponent,
  ],
  entryComponents: [CreateIntervencaoComponent, UpdateIntervencaoComponent],
})
export class Tab1PageModule {}
