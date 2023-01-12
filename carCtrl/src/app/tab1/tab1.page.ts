import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { CreateIntervencaoComponent } from '../modals/create-intervencao/create-intervencao.component';
import { UpdateIntervencaoComponent } from '../modals/update-intervencao/update-intervencao.component';
import { CrudService } from '../services/api/crud.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  intervencoes = [];
  constructor(
    private modalCtrl: ModalController,
    private crudService: CrudService
  ) {}
  //Intervenções
  async openModalCreateIntervencao() {
    const modalIntervencao = await this.modalCtrl.create({
      component: CreateIntervencaoComponent,
    });

    await modalIntervencao.present();
  }
  async openModalUpdateIntervencao() {
    // console.log(item);
    const modalUpdateIntervencao = await this.modalCtrl.create({
      component: UpdateIntervencaoComponent,
      // componentProps: {
      //   item: item,
      // },
    });

    await modalUpdateIntervencao.present();
  }

  onIonInfinite(ev: any) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
