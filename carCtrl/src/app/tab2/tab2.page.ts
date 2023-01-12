import { CrudService, Car } from './../services/api/crud.service';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
    private crudService: CrudService
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

    await modalIntervencao.present();
  }
  async openModalUpdateIntervencao() {
    // console.log(item);
    const modalUpdateIntervencao = await this.modalCtrl.create({
      component: UpdateCarComponent,
      // componentProps: {
      //   item: item,
      // },
    });

    await modalUpdateIntervencao.present();
  }
}
