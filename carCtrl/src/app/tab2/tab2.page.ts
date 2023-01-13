import { CrudService, Car } from './../services/api/crud.service';
import { Component } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { CreateCarComponent } from '../modals/create-car/create-car.component';
import { UpdateCarComponent } from '../modals/update-car/update-car.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  ngOnInit() {
    this.loadCarros();
  }
  carros: any;
  constructor(
    private modalCtrl: ModalController,
    private crudService: CrudService,
    private loadingCtrl: LoadingController
  ) {}

  async loadCarros() {
    this.crudService.getCars('car', 1).subscribe((res) => {
      this.carros = res.cars;
      console.log(this.carros);
    });
  }

  async openModalCreateIntervencao() {
    const modalIntervencao = await this.modalCtrl.create({
      component: CreateCarComponent,
    });
    modalIntervencao.onDidDismiss().then(() => {
      this.loadingSpinner();
      setTimeout(() => {
        this.crudService.getCars('car', 1).subscribe((res) => {
          this.carros = res.cars;
          console.log(this.carros);
        });
      }, 2000);
    });
    await modalIntervencao.present();
  }
  async openModalUpdateIntervencao(item: any) {
    // console.log(item);
    const modalUpdateIntervencao = await this.modalCtrl.create({
      component: UpdateCarComponent,
      componentProps: {
        item: item,
      },
    });
    modalUpdateIntervencao.onDidDismiss().then(() => {
      this.loadingSpinner();
      setTimeout(() => {
        this.crudService.getCars('car', 1).subscribe((res) => {
          this.carros = res.cars;
          console.log(this.carros);
        });
      }, 2000);
    });
    await modalUpdateIntervencao.present();
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
