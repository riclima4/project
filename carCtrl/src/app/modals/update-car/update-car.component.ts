import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import {
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

  gasType: any;
  years: any;
  marcas: any;
  idMarca: any;
  modelos: any;

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
  ionViewDidEnter() {
    this.marcaInput = this.item.marca.toString();
    this.yearInput = this.item.ano.toString();
    this.fuelInput = this.item.gas.toString();
    this.nomeInput = this.item.nome;
    this.kilometragemInput = this.item.kilometragem;
    this.motorInput = this.item.motor;
  }
  dismissModal() {
    this.modalCtrl.dismiss();
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
      this.modeloInput = this.item.modelo.toString();
    });
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
      // console.log(idCar);
      this.crudService
        .update('updateCar', idCar, updatedCar)
        .subscribe((res) => {
          // console.log(res);
        });
      this.loadingSpinner();

      setTimeout(() => {
        this.dismissModal();
        this.presentToast('top', 'success');
      }, 2000);
    } else {
      this.presentToast('top', 'error');
    }
  }
}
