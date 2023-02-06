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
  priceInput: any;
  carroInput: any;
  tipoInput: any;
  interventionType: any;
  constructor(
    private modalCtrl: ModalController,
    private crudService: CrudService,
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingCtrl: LoadingController,
    private TranslateService: TranslateService
  ) {}

  dismissModal() {
    this.modalCtrl.dismiss();
  }
  ngOnInit() {
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
        // console.log(this.interventionType);
      });
  }
  async presentToast(position: 'top' | 'middle' | 'bottom', nome: string) {
    if (nome == 'success') {
      const toast = await this.toastController.create({
        message: this.TranslateService.instant('toastIntUpdate'),
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
      // console.log(idIntervencao);
      this.crudService
        .update('updateIntervencao', idIntervencao, updatedIntervencao)
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
