import { CrudService, Car } from './../services/api/crud.service';
import { Component } from '@angular/core';
import {
  ActionSheetController,
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { CreateCarComponent } from '../modals/create-car/create-car.component';
import { UpdateCarComponent } from '../modals/update-car/update-car.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  carros: any;
  constructor(
    private modalCtrl: ModalController,
    private crudService: CrudService,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private actionSheetCtrl: ActionSheetController
  ) {}
  ngOnInit() {
    this.loadCarros();
  }
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
  async deleteCarroActionSheet(id: number) {
    const actionSheet = await this.actionSheetCtrl.create({
      mode: 'ios',
      header: 'O carro e as suas intervenções vão ser removidas',
      subHeader: 'Pretende continuar?',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          data: {
            action: 'delete',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    if (result.data.action == 'delete') {
      this.deleteIntervencao(id);
    }
  }
  async presentToastDelete(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Carro eliminado com sucesso',
      duration: 2000,
      position: position,
    });

    await toast.present();
  }
  async deleteIntervencao(id: number) {
    this.crudService.delete('deleteIntervencao', id).subscribe((res) => {});
    this.loadingSpinner();
    setTimeout(() => {
      this.loadCarros();

      this.presentToastDelete('top');
    }, 2000);
  }
}
