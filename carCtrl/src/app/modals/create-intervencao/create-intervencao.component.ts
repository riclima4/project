import { Component, OnInit } from '@angular/core';
import {
  AlertController,
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
  // tipoInput: any;
  constructor(
    private modalCtrl: ModalController,
    private crudService: CrudService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadCarros();
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
    });

    await toast.present();
  }
  async loadCarros() {
    this.crudService.getCars('car', 1).subscribe((res) => {
      this.carros = res.cars;
      console.log(this.carros);
    });
  }
  newIntervencao(idUser: number) {
    if (this.nomeInput && this.descInput) {
      const newIntervencao = {
        idUser: idUser,
        idCarro: this.carInput,
        nome: this.nomeInput,
        description: this.descInput,
        kilometragem: this.kilometragemInput,
      };
      console.log(newIntervencao);
      this.crudService
        .create('newIntervencao', newIntervencao)
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
