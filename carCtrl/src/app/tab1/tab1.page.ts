import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
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
  constructor(
    private modalCtrl: ModalController,
    private crudService: CrudService,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private router: Router
  ) {}
  ngOnInit() {
    this.checkToken();
    this.loadIntervencoes();
  }
  checkToken = async () => {
    const hasToken = await Preferences.get({ key: 'token' });
    if (hasToken.value === null) {
      this.router.navigateByUrl('/signin', { replaceUrl: true });
    } else {
      this.router.navigateByUrl('/tab1', { replaceUrl: true });
    }
  };
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
  async deleteIntervencao(id: number) {
    this.crudService.delete('deleteIntervencao', id).subscribe((res) => {});
    this.loadingSpinner();
    setTimeout(() => {
      this.loadIntervencoes();

      this.presentToastDelete('top');
    }, 2000);
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
      message: 'Intervencao eliminada com sucesso',
      duration: 2000,
      position: position,
    });

    await toast.present();
  }
}
