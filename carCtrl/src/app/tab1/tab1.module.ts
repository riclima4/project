import { InfoIntComponent } from './../modals/info-int/info-int.component';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { CreateIntervencaoComponent } from '../modals/create-intervencao/create-intervencao.component';
import { UpdateIntervencaoComponent } from '../modals/update-intervencao/update-intervencao.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    TranslateModule,
    ComponentsModule,
  ],
  declarations: [
    Tab1Page,
    CreateIntervencaoComponent,
    UpdateIntervencaoComponent,
    InfoIntComponent,
  ],
  entryComponents: [CreateIntervencaoComponent, UpdateIntervencaoComponent],
})
export class Tab1PageModule {}
