import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
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
  carroById: any;
  priceInput: any;
  carroInput: any;
  tipoInput: any;
  interventionType: any;
  constructor(
    private modalCtrl: ModalController,
    private crudService: CrudService,
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingCtrl: LoadingController
  ) {}
  compareWith(item1: any, item2: any) {
    return item1 && item2 ? item1.idCarro === item2.idCarro : item1 === item2;
  }
  async loadingSpinner() {
    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      mode: 'ios',
      duration: 2000,
    });
    await loading.present();
  }
  ngOnInit() {
    this.loadCarroById();
    this.loadInterventionType();
  }
  ionViewDidEnter() {
    this.carroInput = this.item.carro.nome;
    this.nomeInput = this.item.nome;
    this.descInput = this.item.description;
    this.kilometragemInput = this.item.kilometragem;
    this.priceInput = this.item.price;
    this.tipoInput = this.item.type.toString();
  }
  async loadInterventionType() {
    this.crudService
      .getInterventionType('interventionType')
      .subscribe((res) => {
        this.interventionType = res.interventionType;
        console.log(this.interventionType);
      });
  }
  async loadCarros() {
    this.crudService.getCars('car', this.item.idCarro).subscribe((res) => {
      this.carros = res.cars;
      console.log(this.carros);
    });
  }

  async loadCarroById() {
    this.crudService.getCars('carById', this.item.idCarro).subscribe((res) => {
      this.carroById = res.cars;
      console.log(this.carroById);
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
      color: 'success',
    });

    await toast.present();
  }
  newUpdate() {
    if (
      this.nomeInput &&
      this.descInput &&
      this.kilometragemInput &&
      this.priceInput &&
      this.tipoInput
    ) {
      const idIntervencao = this.item.idIntervencao;
      const idUser = this.item.idUser;
      const updatedIntervencao = {
        idUser: idUser,
        nome: this.nomeInput,
        description: this.descInput,
        kilometragem: this.kilometragemInput,
        price: this.priceInput,
        type: this.tipoInput,
      };
      console.log(idIntervencao);
      this.crudService
        .update('updateIntervencao', idIntervencao, updatedIntervencao)
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
