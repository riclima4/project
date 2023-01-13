import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { CrudService } from 'src/app/services/api/crud.service';

@Component({
  selector: 'app-update-intervencao',
  templateUrl: './update-intervencao.component.html',
  styleUrls: ['./update-intervencao.component.scss'],
})
export class UpdateIntervencaoComponent implements OnInit {
  item: any;
  nomeInput: any;
  descInput: any;
  carInput: any;
  kilometragemInput: any;
  carros: any;
  constructor(
    private modalCtrl: ModalController,
    private crudService: CrudService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadCarros();
    this.nomeInput = this.item.nome;
    this.descInput = this.item.description;
    this.carInput = this.item.idCarro;
    this.kilometragemInput = this.item.kilometragem;
  }
  async loadCarros() {
    this.crudService.getCars('car', this.item.idCarro).subscribe((res) => {
      this.carros = res.cars;
      console.log(this.carros);
    });
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
      message: 'Intervenção editada com sucesso',
      duration: 2000,
      position: position,
    });

    await toast.present();
  }
  newUpdate() {
    if (this.nomeInput && this.descInput) {
      const idIntervencao = this.item.idIntervencao;
      const idUser = this.item.idUser;
      const updatedIntervencao = {
        idUser: idUser,
        nome: this.nomeInput,
        description: this.descInput,
        idCarro: this.carInput,
        kilometragem: this.kilometragemInput,
      };
      console.log(idIntervencao);
      this.crudService
        .update('updateIntervencao', idIntervencao, updatedIntervencao)
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
