import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarComponent } from './navbar/navbar.component';

const components = [NavbarComponent];

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule],
  declarations: components,
  exports: components,
})
export class ComponentsModule {}
