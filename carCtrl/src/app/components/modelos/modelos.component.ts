import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  ActionSheetController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { CrudService } from 'src/app/services/api/crud.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.component.html',
  styleUrls: ['./modelos.component.scss'],
})
export class ModelosComponent implements OnInit {
  page = 0;
  resultsCount = 10;
  totalPages: number;
  sortDirection = 0;
  sortKey = null;
  allModelos: any;
  disabledBack: any;
  disabledForward: any;
  searchTerm: string;
  marcaInput: any;
  modeloInput: any;
  modeloUpdateInput: any;
  marcaUpdateInput: any;
  hideUpdate = true;
  hideCreate = true;
  hideBtn = false;
  idModeloUpdateInput: any;
  modelosArr: any;
  marcasArr: any;

  constructor(
    private translateService: TranslateService,
    private crudService: CrudService,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    this.loadModelosCount();
    this.loadModelos();
    this.loadMarcas();
  }
  // ionViewWillEnter() {}
  async loadingSpinner() {
    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      mode: 'ios',
    });
    await loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }
  async presentToast(position: 'top' | 'middle' | 'bottom', nome: string) {
    if (nome == 'success') {
      const toast = await this.toastController.create({
        message: 'Modelo adicionado com sucesso',
        duration: 2000,
        position: position,
        color: 'success',
      });
      await toast.present();
    } else if (nome == 'input') {
      const toast = await this.toastController.create({
        message: 'Dados inválidos tenta outra vez',
        duration: 2000,
        position: position,
        color: 'danger',
      });
      await toast.present();
    } else if (nome == 'edit') {
      const toast = await this.toastController.create({
        message: 'Modelo editado com sucesso',
        duration: 2000,
        position: position,
        color: 'success',
      });

      await toast.present();
    } else if (nome == 'delete') {
      const toast = await this.toastController.create({
        message: 'Modelo eliminado com sucesso',
        duration: 2000,
        position: position,
        color: 'success',
      });

      await toast.present();
    } else if (nome == 'deleteError') {
      const toast = await this.toastController.create({
        message:
          'O Modelo não pode ser eliminado pois contem intervenções com ele adicionado ',
        duration: 2000,
        position: position,
        color: 'danger',
      });

      await toast.present();
    }
  }
  sortBy(key: any) {
    this.sortKey = key;
    this.sortDirection++;
    this.sort();
  }
  sort() {
    if (this.sortDirection == 1) {
      this.modelosArr = this.modelosArr.sort((a, b) => {
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        return valA.localeCompare(valB);
      });
    } else if (this.sortDirection == 2) {
      this.modelosArr = this.modelosArr.sort((a, b) => {
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];

        return valB.localeCompare(valA);
      });
    } else {
      this.sortDirection = 0;
      this.sortKey = null;
    }
  }
  disableBtn() {
    if (this.page <= 0) {
      this.page = 0;
      this.disabledBack = true;
    } else {
      this.disabledBack = false;
    }
    if (this.page + 1 >= this.totalPages) {
      this.page = this.totalPages - 1;
      this.disabledForward = true;
    } else {
      this.disabledForward = false;
    }
    return;
  }
  nextPage() {
    this.page++;
    this.disableBtn();
    this.loadModelos();
    return;
  }
  prevPage() {
    this.page--;
    this.disableBtn();
    this.loadModelos();
    return;
  }
  goFirst() {
    this.page = 0;
    this.disableBtn();
    this.loadModelos();
    return;
  }
  goLast() {
    this.page = this.totalPages - 1;
    this.disableBtn();
    this.loadModelos();
    return;
  }
  async loadMarcas() {
    this.crudService.getMarca('marcas').subscribe((res) => {
      this.marcasArr = res.marca;
    });
  }
  async loadModelos() {
    this.crudService
      .getModeloTable('modelosTable', this.page, this.resultsCount)
      .subscribe((res) => {
        this.modelosArr = res.modelo;
        console.log(this.modelosArr);
      });
  }
  async loadModelosCount() {
    this.crudService.getAllModelos('modelos').subscribe((res) => {
      this.allModelos = res.modelo.length;
      this.totalPages = Math.ceil(this.allModelos / this.resultsCount);
      this.disableBtn();
    });
  }
  newModelo(form: NgForm) {
    if (
      !this.modeloInput ||
      this.modeloInput == '' ||
      this.modeloInput == ' ' ||
      !this.marcaInput ||
      this.marcaInput == ''
    ) {
      return this.presentToast('top', 'input');
    }
    const newModelo = {
      marca: this.marcaInput,
      modelo: this.modeloInput,
    };
    this.crudService.create('newModelo', newModelo).subscribe((res) => {
      console.log(res);
      this.loadingSpinner();
      setTimeout(() => {
        form.reset();
        this.presentToast('top', 'success');
        this.loadModelosCount();
        this.loadModelos();
        this.hideCreate = true;
        this.hideBtn = false;
      }, 2000);
    });
  }
  getAllModelos() {
    if (this.searchTerm == '') {
      this.resultsCount = 10;

      return;
    }
    this.crudService.getAllModelos('modelos').subscribe((res) => {
      this.resultsCount = res.modelo.length;
      console.log(this.totalPages);
      this.disableBtn();
    });
  }
  updateInputModelo(item: any) {
    this.hideUpdate = false;
    this.hideCreate = true;
    this.hideBtn = false;
    setTimeout(() => {
      this.marcaUpdateInput = item.idMarca.toString();
    }, 300);

    this.modeloUpdateInput = item.modelo;
    this.idModeloUpdateInput = item.idModelo;
  }
  updateModelo() {
    if (this.modeloUpdateInput && this.marcaUpdateInput) {
      const updatedModelo = {
        idMarca: this.marcaUpdateInput,
        idModelo: this.idModeloUpdateInput,
        modelo: this.modeloUpdateInput,
      };
      console.log(updatedModelo);

      this.crudService
        .update('updateModelo', this.idModeloUpdateInput, updatedModelo)
        .subscribe((res) => {
          console.log(res);
          this.page = 0;
          this.disableBtn();
        });
      this.loadingSpinner();

      setTimeout(() => {
        this.presentToast('top', 'edit');
        this.loadModelos();
        this.hideUpdate = true;
        this.marcaUpdateInput = '';
      }, 2000);
    } else {
      this.presentToast('top', 'input');
    }
  }
  async deleteActionSheet(id: number) {
    this.hideUpdate = true;
    const actionSheet = await this.actionSheetCtrl.create({
      mode: 'ios',
      header: 'O Modelo e todas as suas informações vão ser removidas',
      subHeader: 'Pretende continuar?',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          data: {
            action: 'delete',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    if (result.data.action == 'delete') {
      this.delete(id);
    }
    return;
  }
  delete(id: number) {
    this.crudService.delete('deleteModelo', id).subscribe((res) => {
      if (res == '401') {
        this.loadingSpinner();
        setTimeout(() => {
          return this.presentToast('top', 'deleteError');
        }, 2000);
      } else {
        this.loadingSpinner();
        setTimeout(() => {
          this.loadModelos();
          this.presentToast('top', 'delete');
          this.searchTerm = '';
        }, 2000);
      }
    });
  }
}
