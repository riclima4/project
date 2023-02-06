import { TranslateService } from '@ngx-translate/core';
import { InfoCarComponent } from './../modals/info-car/info-car.component';
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
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { TradeCarComponent } from '../modals/trade-car/trade-car.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  carros: any;
  user: any;
  userID: any;
  haveCars: any;

  constructor(
    private modalCtrl: ModalController,
    private crudService: CrudService,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    private TranslateService: TranslateService
  ) {}
  ngOnInit() {
    this.checkToken();
    this.getToken();
    this.checkDarkmode();
  }
  ionViewDidEnter() {
    this.loadCarros();
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
  checkToken = async () => {
    const hasToken = await Preferences.get({ key: 'token' });
    if (hasToken.value === null) {
      this.router.navigateByUrl('/signin', { replaceUrl: true });
    } else {
      this.router.navigateByUrl('/tab2', { replaceUrl: true });
    }
  };
  checkDarkmode = async () => {
    const darkmode = await Preferences.get({ key: 'color-theme' });
    if (darkmode.value == 'dark') {
      document.body.setAttribute('color-theme', 'dark');
    } else {
      document.body.setAttribute('color-theme', 'light');
    }
  };
  getToken = async () => {
    const token = await Preferences.get({ key: 'token' });

    // console.log(token.value !== null);
    if (token.value !== null) {
      const user = jwt_decode(token.value);
      this.user = user;
      this.userID = this.user.idUser;
      // console.log(this.userID);
    }
  };
  async loadCarros() {
    this.crudService.getCars('car', this.userID).subscribe((res) => {
      this.carros = res.cars;
      // console.log(this.carros);
      if (this.carros.length > 0) {
        this.haveCars = true;
        return;
      }
      this.haveCars = false;
    });
  }
  async openModalCreateCarro() {
    const modalCarro = await this.modalCtrl.create({
      component: CreateCarComponent,
      componentProps: {
        userID: this.userID,
      },
    });
    modalCarro.onDidDismiss().then(() => {
      // this.loadingSpinner();
      this.loadCarros();
    });
    await modalCarro.present();
  }
  async openModalUpdateCarro(item: any) {
    // console.log(item);
    const modalUpdateCarro = await this.modalCtrl.create({
      component: UpdateCarComponent,
      componentProps: {
        item: item,
      },
    });
    modalUpdateCarro.onDidDismiss().then(() => {
      // this.loadingSpinner();
      this.loadCarros();
    });
    await modalUpdateCarro.present();
  }
  async openModaInfoCar(item: any) {
    // console.log(item);
    const modaInfoCar = await this.modalCtrl.create({
      component: InfoCarComponent,
      componentProps: {
        item: item,
      },
    });

    await modaInfoCar.present();
  }
  async openModaTradeCar(item: any) {
    // console.log(item);
    const modaTradeCar = await this.modalCtrl.create({
      component: TradeCarComponent,
      componentProps: {
        item: item,
      },
    });
    modaTradeCar.onDidDismiss().then(() => {
      // this.loadingSpinner();
      this.loadCarros();
    });
    await modaTradeCar.present();
  }
  async deleteCarroActionSheet(id: number) {
    const actionSheet = await this.actionSheetCtrl.create({
      mode: 'ios',
      header: this.TranslateService.instant('headerDeleteCar'),
      subHeader: this.TranslateService.instant('subHeaderDeleteCar'),
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          data: {
            action: 'delete',
          },
          handler: () => {
            this.deleteCarro(id);
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
  }
  async presentToastDelete(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: this.TranslateService.instant('toastCarDelete'),
      duration: 2000,
      position: position,
      color: 'success',
    });

    await toast.present();
  }
  async deleteCarro(id: number) {
    this.crudService.delete('removeCar', id).subscribe((res) => {});
    this.loadingSpinner();
    setTimeout(() => {
      this.loadCarros();
      this.presentToastDelete('top');
    }, 2000);
  }
}
