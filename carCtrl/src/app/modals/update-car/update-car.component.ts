import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { CrudService } from 'src/app/services/api/crud.service';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.scss'],
})
export class UpdateCarComponent implements OnInit {
  item: any;
  nomeInput: any;
  marcaInput: any;
  kilometragemInput: any;

  constructor(
    private modalCtrl: ModalController,
    private crudService: CrudService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.nomeInput = this.item.nome;
    this.marcaInput = this.item.marca;
    this.kilometragemInput = this.item.kilometragem;
  }

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
      message: 'Carro editado com sucesso',
      duration: 2000,
      position: position,
    });

    await toast.present();
  }
  newUpdate() {
    if (this.nomeInput && this.marcaInput) {
      const idCar = this.item.idCarro;
      const idUser = this.item.idUser;
      const updatedCar = {
        idUser: idUser,
        nome: this.nomeInput,
        marca: this.marcaInput,
        kilometragem: this.kilometragemInput,
      };
      console.log(idCar);
      this.crudService
        .update('updateCar', idCar, updatedCar)
        .subscribe((res) => {
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
