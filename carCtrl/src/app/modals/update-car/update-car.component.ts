import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
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
  motorInput: any;
  modeloInput: any;
  yearInput: any;
  fuelInput: any;

  constructor(
    private modalCtrl: ModalController,
    private crudService: CrudService,
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.nomeInput = this.item.nome;
    this.marcaInput = this.item.marca;
    this.kilometragemInput = this.item.kilometragem;
    this.yearInput = this.item.ano;
    this.motorInput = this.item.motor;
    this.modeloInput = this.item.modelo;
    this.fuelInput = this.item.gasType;
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
      color: 'success',
    });

    await toast.present();
  }
  async loadingSpinner() {
    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      mode: 'ios',
      duration: 2000,
    });
    await loading.present();
  }
  newUpdate() {
    if (
      this.nomeInput &&
      this.marcaInput &&
      this.kilometragemInput &&
      this.modeloInput &&
      this.yearInput &&
      this.motorInput &&
      this.fuelInput
    ) {
      const idCar = this.item.idCarro;
      const idUser = this.item.idUser;
      const updatedCar = {
        idUser: idUser,
        nome: this.nomeInput,
        marca: this.marcaInput,
        kilometragem: this.kilometragemInput,
        ano: this.yearInput,
        motor: this.motorInput,
        modelo: this.modeloInput,
        gasType: this.fuelInput,
      };
      console.log(idCar);
      this.crudService
        .update('updateCar', idCar, updatedCar)
        .subscribe((res) => {
          // console.log(res);
        });
      this.loadingSpinner();

      setTimeout(() => {
        this.dismissModal();
        this.presentToast('top');
      }, 2000);
    } else {
      this.presentAlert();
    }
  }
}
