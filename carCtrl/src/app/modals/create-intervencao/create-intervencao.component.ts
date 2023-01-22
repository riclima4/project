import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { CrudService } from 'src/app/services/api/crud.service';

@Component({
  selector: 'app-create-intervencao',
  templateUrl: './create-intervencao.component.html',
  styleUrls: ['./create-intervencao.component.scss'],
})
export class CreateIntervencaoComponent implements OnInit {
  nomeInput: any;
  descInput: any;
  carInput: any;
  kilometragemInput: any;
  carros: any;
  idUser: any;
  priceInput: any;
  tipoInput: any;

  interventionType: any;
  constructor(
    private modalCtrl: ModalController,
    private crudService: CrudService,
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.loadCarros();
    this.loadInterventionType();
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
      message: 'Intervenção criada com sucesso',
      duration: 2000,
      position: position,
      color: 'success',
    });

    await toast.present();
  }
  async loadCarros() {
    this.crudService.getCars('car', this.idUser).subscribe((res) => {
      this.carros = res.cars;
      console.log(this.carros);
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
  async loadInterventionType() {
    this.crudService
      .getInterventionType('interventionType')
      .subscribe((res) => {
        this.interventionType = res.interventionType;
        console.log(this.interventionType);
      });
  }
  newIntervencao() {
    if (
      this.nomeInput &&
      this.descInput &&
      this.kilometragemInput &&
      this.carInput &&
      this.priceInput &&
      this.tipoInput
    ) {
      const newIntervencao = {
        idUser: this.idUser,
        idCarro: this.carInput,
        nome: this.nomeInput,
        description: this.descInput,
        kilometragem: this.kilometragemInput,
        price: this.priceInput,
        type: this.tipoInput,
      };
      console.log(newIntervencao);
      this.crudService
        .create('newIntervencao', newIntervencao)
        .subscribe((res) => {
          console.log(res);
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
