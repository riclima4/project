import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MarcasComponent } from './marcas/marcas.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const components = [NavbarComponent, MarcasComponent];

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
