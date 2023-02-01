import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { AdminDashboardPageRoutingModule } from './admin-dashboard-routing.module';

import { AdminDashboardPage } from './admin-dashboard.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ComponentsModule } from '../components/components.module';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminDashboardPageRoutingModule,
    TranslateModule,
    Ng2SearchPipeModule,
    ComponentsModule,
    NgChartsModule,
  ],
  declarations: [AdminDashboardPage],
})
export class AdminDashboardPageModule {}
