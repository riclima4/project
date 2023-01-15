import { Component } from '@angular/core';
import {
  InfiniteScrollCustomEvent,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { CreateIntervencaoComponent } from '../modals/create-intervencao/create-intervencao.component';
import { UpdateIntervencaoComponent } from '../modals/update-intervencao/update-intervencao.component';
import { CrudService } from '../services/api/crud.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  intervencoes: any;

  constructor(
    private modalCtrl: ModalController,
    private crudService: CrudService,
    private loadingCtrl: LoadingController
  ) {}
  ngOnInit() {
    this.loadIntervencoes();
  }
  //Intervenções
  async openModalCreateIntervencao() {
    const modalIntervencao = await this.modalCtrl.create({
      component: CreateIntervencaoComponent,
    });
    modalIntervencao.onDidDismiss().then(() => {
      this.loadingSpinner();
      setTimeout(() => {
        this.loadIntervencoes();
      }, 2000);
    });
    await modalIntervencao.present();
  }
  async openModalUpdateIntervencao(item: any) {
    console.log(item);
    const modalUpdateIntervencao = await this.modalCtrl.create({
      component: UpdateIntervencaoComponent,
      componentProps: {
        item: item,
      },
    });
    modalUpdateIntervencao.onDidDismiss().then(() => {
      this.loadingSpinner();
      setTimeout(() => {
        this.loadIntervencoes();
      }, 2000);
    });
    await modalUpdateIntervencao.present();
  }

  async loadIntervencoes() {
    this.crudService.getIntervencao('intervencoes', 1).subscribe((res) => {
      this.intervencoes = res.intervencao;
    });
  }

  onIonInfinite(ev: any) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
  async loadingSpinner() {
    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      mode: 'ios',
    });
    await loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }
}
