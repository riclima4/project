import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MarcasComponent } from './marcas/marcas.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ModelosComponent } from './modelos/modelos.component';
import { GasTypeComponent } from './cars/gas-type/gas-type.component';
import { YearsComponent } from './cars/years/years.component';
import { InterventionsComponent } from './interventions/interventions.component';
import { UsersComponent } from './users/users.component';
import { StatsComponent } from './stats/stats.component';

const components = [
  NavbarComponent,
  MarcasComponent,
  ModelosComponent,
  GasTypeComponent,
  YearsComponent,
  InterventionsComponent,
  UsersComponent,
  StatsComponent,
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    Ng2SearchPipeModule,
  ],
  declarations: components,
  exports: components,
})
export class ComponentsModule {}
