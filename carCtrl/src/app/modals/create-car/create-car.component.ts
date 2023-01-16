import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { CrudService } from 'src/app/services/api/crud.service';

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.scss'],
})
export class CreateCarComponent implements OnInit {
  nomeInput: any;
  marcaInput: any;
  kilometragemInput: any;
  userID: any;
  constructor(
    private modalCtrl: ModalController,
    private crudService: CrudService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Erro',
      subHeader: 'Dados Inválidos',
      mode: 'ios',
      buttons: ['OK'],
    });

    await alert.present();
  }
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Carro criado com sucesso',
      duration: 2000,
      position: position,
    });

    await toast.present();
  }
  newCar() {
    if (this.nomeInput && this.marcaInput) {
      const newCar = {
        idUser: this.userID,
        nome: this.nomeInput,
        marca: this.marcaInput,
        kilometragem: this.kilometragemInput,
      };
      console.log(newCar);
      this.crudService.create('newCar', newCar).subscribe((res) => {
        console.log(res);
      });
      this.dismissModal();
      setTimeout(() => {
        this.presentToast('top');
      }, 2500);
    } else {
      this.dismissModal();
      setTimeout(() => {
        this.presentAlert();
      }, 2500);
    }
  }
}
