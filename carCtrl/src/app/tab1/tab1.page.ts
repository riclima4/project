import { TranslateService } from '@ngx-translate/core';
import { InfoIntComponent } from './../modals/info-int/info-int.component';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import jwt_decode from 'jwt-decode';
import {
  ActionSheetController,
  InfiniteScrollCustomEvent,
  LoadingController,
  ModalController,
  ToastController,
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
  user: any;
  userID: any;
  haveCars: any;
  carros: any;
  haveInterventions: any;

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
    this.loadIntervencoes();
    this.loadCarros();
  }

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
  checkToken = async () => {
    const hasToken = await Preferences.get({ key: 'token' });
    if (hasToken.value === null) {
      this.router.navigateByUrl('/signin', { replaceUrl: true });
    } else {
      this.router.navigateByUrl('/tab1', { replaceUrl: true });
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
  async deleteIntervencaoActionSheet(id: number) {
    const actionSheet = await this.actionSheetCtrl.create({
      mode: 'ios',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          data: {
            action: 'delete',
          },
          handler: () => {
            this.deleteIntervencao(id);
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
      message: this.TranslateService.instant('toastIntDelete'),
      duration: 2000,
      position: position,
      color: 'success',
    });

    await toast.present();
  }
  async openModalCreateIntervencao() {
    const modalIntervencao = await this.modalCtrl.create({
      component: CreateIntervencaoComponent,
      componentProps: {
        idUser: this.userID,
      },
    });
    modalIntervencao.onDidDismiss().then(() => {
      // this.loadingSpinner();
      this.loadIntervencoes();
    });
    await modalIntervencao.present();
  }
  async openModalUpdateIntervencao(item: any) {
    // console.log(item);
    const modalUpdateIntervencao = await this.modalCtrl.create({
      component: UpdateIntervencaoComponent,
      componentProps: {
        item: item,
      },
    });
    modalUpdateIntervencao.onDidDismiss().then(() => {
      // this.loadingSpinner();
      this.loadIntervencoes();
    });
    await modalUpdateIntervencao.present();
  }
  async openModalInfoIntervencao(item: any) {
    // console.log(item);
    const modalInfoIntervencao = await this.modalCtrl.create({
      component: InfoIntComponent,
      componentProps: {
        item: item,
      },
    });
    modalInfoIntervencao.onDidDismiss().then(() => {
      this.loadIntervencoes();
    });
    await modalInfoIntervencao.present();
  }
  async deleteIntervencao(id: number) {
    this.crudService.delete('deleteIntervencao', id).subscribe((res) => {});
    this.loadingSpinner();
    setTimeout(() => {
      this.loadIntervencoes();
      this.presentToastDelete('top');
    }, 2000);
  }
  async loadIntervencoes() {
    // console.log(this.userID);
    this.crudService
      .getIntervencao('intervencoes', this.userID)
      .subscribe((res) => {
        this.intervencoes = res.intervencao;
        // console.log(this.intervencoes);
        if (this.intervencoes.length > 0) {
          this.haveInterventions = true;
          // console.log(this.haveCars);
          return;
        }
        this.haveInterventions = false;
        // console.log(this.haveCars);
      });
  }
  async loadCarros() {
    this.crudService.getCars('car', this.userID).subscribe((res) => {
      this.carros = res.cars;

      if (this.carros.length > 0) {
        this.haveCars = true;
        // console.log(this.haveCars);
        return;
      }
      this.haveCars = false;
      // console.log(this.haveCars);
    });
  }
  async loadingSpinner() {
    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      mode: 'ios',
      duration: 2000,
    });
    await loading.present();
  }
}
