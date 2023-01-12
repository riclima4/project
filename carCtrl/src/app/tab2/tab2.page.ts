import { CrudService, Car } from './../services/api/crud.service';
import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  carsArray: any = [];

  constructor(
    private loadingCtrl: LoadingController,
    private crudService: CrudService
  ) {}

  // async loadCars() {
  //   const loading = await this.loadingCtrl.create({
  //     spinner: 'dots',
  //   });
  //   await loading.present();
  //   this.crudService.getCars('cars').subscribe((res) => {
  //     loading.dismiss();
  //     this.carsArray = res;
  //     console.log(res);
  //   });
  // }
  // ngOnInit() {
  //   this.loadCars();
  // }
}
