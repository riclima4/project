import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { CrudService } from 'src/app/services/api/crud.service';

@Component({
  selector: 'app-trade-car',
  templateUrl: './trade-car.component.html',
  styleUrls: ['./trade-car.component.scss'],
})
export class TradeCarComponent implements OnInit {
  item: any;
  emailInput: any;
  user: any;
  constructor(
    private modalCtrl: ModalController,
    private crudService: CrudService,
    private toastController: ToastController,
    private loadingCtrl: LoadingController,
    private TranslateService: TranslateService
  ) {}

  ngOnInit() {}
  dismissModal() {
    this.modalCtrl.dismiss();
  }
  async loadingSpinner() {
    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      mode: 'ios',
      duration: 2000,
    });
    await loading.present();
  }
  async presentToast(position: 'top' | 'middle' | 'bottom', nome: string) {
    if (nome == 'success') {
      const toast = await this.toastController.create({
        message: this.TranslateService.instant('toastCarUpdate'),
        duration: 2000,
        position: position,
        color: 'success',
      });

      await toast.present();
    } else if (nome == 'error') {
      const toast = await this.toastController.create({
        message: this.TranslateService.instant('toastData'),
        duration: 2000,
        position: position,
        color: 'danger',
      });

      await toast.present();
    }
  }
  trade() {
    if (!this.emailInput || this.emailInput == '') {
      return console.log('ja foste armindo');
    }
    this.loadUser(this.emailInput);
  }
  async loadUser(email: any) {
    this.crudService.getUserByEmail('userEmail', email).subscribe((res) => {
      this.user = res.users;
      if (!this.user) {
        return this.presentToast('top', 'error');
      } else {
        const carUpdated = {
          idUser: this.user.idUser,
        };
        this.crudService
          .update('updateCar', this.item.idCarro, carUpdated)
          .subscribe((res) => {
            // console.log('done');
          });
        this.loadingSpinner();
        setTimeout(() => {
          this.dismissModal();
          this.presentToast('top', 'success');
        }, 2000);
      }
    });
  }
}
