import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
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
  motorInput: any;
  modeloInput: any;
  yearInput: any;
  fuelInput: any;

  gasType: any;
  years: any;
  marcas: any;
  modelos: any;
  idMarca: any;
  constructor(
    private modalCtrl: ModalController,
    private crudService: CrudService,
    private toastController: ToastController,
    private loadingCtrl: LoadingController,
    private TranslateService: TranslateService
  ) {}

  ngOnInit() {
    this.loadGasType();
    this.loadYears();
    this.loadMarcas();
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
  async presentToast(position: 'top' | 'middle' | 'bottom', nome: string) {
    if (nome == 'car') {
      const toast = await this.toastController.create({
        message: this.TranslateService.instant('toastCar'),
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
  async loadingSpinner() {
    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      mode: 'ios',
      duration: 2000,
    });
    await loading.present();
  }
  async loadGasType() {
    this.crudService.getGasType('combustivel').subscribe((res) => {
      this.gasType = res.gasType;
      // console.log(this.gasType);
    });
  }
  async loadYears() {
    this.crudService.getYear('years').subscribe((res) => {
      this.years = res.years;
      // console.log(this.years);
    });
  }
  async loadMarcas() {
    this.crudService.getMarca('marcas').subscribe((res) => {
      this.marcas = res.marca;
      // console.log(this.marcas);
    });
  }
  async loadModelo($event: any) {
    this.idMarca = $event.target.value;
    // console.log(this.idMarca);
    this.crudService.getModelo('modelo', this.idMarca).subscribe((res) => {
      this.modelos = res.modelo;
      // console.log(this.modelos);
    });
  }
  newCar() {
    if (
      this.nomeInput &&
      this.marcaInput &&
      this.kilometragemInput &&
      this.marcaInput &&
      this.modeloInput &&
      this.yearInput &&
      this.fuelInput
    ) {
      const newCar = {
        idUser: this.userID,
        nome: this.nomeInput,
        marca: this.marcaInput,
        modelo: this.modeloInput,
        motor: this.motorInput,
        ano: this.yearInput,
        gasType: this.fuelInput,
        kilometragem: this.kilometragemInput,
      };
      // console.log(newCar);
      this.crudService.create('newCar', newCar).subscribe((res) => {
        // console.log(res);
      });
      this.loadingSpinner();

      setTimeout(() => {
        this.dismissModal();
        this.presentToast('top', 'car');
      }, 2000);
    } else {
      this.presentToast('top', 'error');
    }
  }
}
