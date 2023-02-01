import { Component, OnInit } from '@angular/core';
import {
  ActionSheetController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { CrudService } from 'src/app/services/api/crud.service';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.scss'],
})
export class MarcasComponent implements OnInit {
  marcasArr: any;
  page = 0;
  resultsCount = 10;
  totalPages: number;
  sortDirection = 0;
  sortKey = null;
  allMarcas: any;
  disabledBack: any;
  disabledForward: any;
  searchTerm: string;
  marcaInput: any;
  marcaUpdateInput: any;
  hideUpdate = true;
  hideCreate = true;
  hideBtn = false;
  idMarcaUpdateInput: any;

  constructor(
    private translateService: TranslateService,
    private crudService: CrudService,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    this.loadMarcasCount();
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
        message: 'Marca adicionada com sucesso',
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
        message: 'Marca editada com sucesso',
        duration: 2000,
        position: position,
        color: 'success',
      });

      await toast.present();
    } else if (nome == 'delete') {
      const toast = await this.toastController.create({
        message: 'Marca eliminada com sucesso',
        duration: 2000,
        position: position,
        color: 'success',
      });

      await toast.present();
    } else if (nome == 'deleteError') {
      const toast = await this.toastController.create({
        message:
          'A Marca não pode ser eliminada pois contem modelos ou é usada em algum Carro ',
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
      this.marcasArr = this.marcasArr.sort((a, b) => {
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        return valA.localeCompare(valB);
      });
    } else if (this.sortDirection == 2) {
      this.marcasArr = this.marcasArr.sort((a, b) => {
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
    this.loadMarcas();
    return;
  }
  prevPage() {
    this.page--;
    this.disableBtn();
    this.loadMarcas();
    return;
  }
  goFirst() {
    this.page = 0;
    this.disableBtn();
    this.loadMarcas();
    return;
  }
  goLast() {
    this.page = this.totalPages - 1;
    this.disableBtn();
    this.loadMarcas();
    return;
  }
  async loadMarcas() {
    this.page = 0;
    this.crudService
      .getMarcaTable('marcasTable', this.page, this.resultsCount)
      .subscribe((res) => {
        this.marcasArr = res.marca;
        // console.log(this.marcasArr);
      });
  }
  async loadMarcasCount() {
    this.crudService.getMarca('marcas').subscribe((res) => {
      this.allMarcas = res.marca.length;
      this.totalPages = Math.ceil(this.allMarcas / this.resultsCount);
      // console.log(this.totalPages);
      this.disableBtn();
    });
  }
  newMarca(form: NgForm) {
    if (!this.marcaInput || this.marcaInput == '' || this.marcaInput == ' ') {
      return this.presentToast('top', 'input');
    }
    const newMarca = {
      marca: this.marcaInput,
    };
    this.crudService.create('newMarca', newMarca).subscribe((res) => {
      // console.log(res);
      this.loadingSpinner();
      setTimeout(() => {
        form.reset();
        this.presentToast('top', 'success');
        this.loadMarcasCount();
        this.loadMarcas();
        this.hideCreate = true;
        this.hideBtn = false;
      }, 2000);
    });
  }
  getAllMarcas() {
    if (this.searchTerm == '') {
      this.resultsCount = 10;
      return;
    }
    this.crudService.getMarca('marcas').subscribe((res) => {
      this.resultsCount = res.marca.length;
      // console.log(this.totalPages);
      this.disableBtn();
    });
  }
  updateInputMarca(item: any) {
    this.marcaUpdateInput = item.marca;
    this.idMarcaUpdateInput = item.idMarca;
    this.hideUpdate = false;
    this.hideCreate = true;
    this.hideBtn = false;
  }
  updateMarca() {
    if (this.marcaUpdateInput) {
      const updatedMarca = {
        idMarca: this.idMarcaUpdateInput,
        marca: this.marcaUpdateInput,
      };
      // console.log(updatedMarca);

      this.crudService
        .update('updateMarca', this.idMarcaUpdateInput, updatedMarca)
        .subscribe((res) => {
          // console.log(res);
          this.page = 0;
          this.disableBtn();
        });
      this.loadingSpinner();

      setTimeout(() => {
        this.presentToast('top', 'edit');
        this.loadMarcas();
        this.hideUpdate = true;
      }, 2000);
    } else {
      this.presentToast('top', 'input');
    }
  }
  async deleteActionSheet(id: number) {
    this.hideUpdate = true;
    const actionSheet = await this.actionSheetCtrl.create({
      mode: 'ios',
      header: 'A marca e todas as suas informações vão ser removidas',
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
    this.crudService.delete('deleteMarca', id).subscribe((res) => {
      if (res == '401') {
        this.loadingSpinner();
        setTimeout(() => {
          return this.presentToast('top', 'deleteError');
        }, 2000);
      } else {
        this.loadingSpinner();
        setTimeout(() => {
          this.loadMarcas();
          this.presentToast('top', 'delete');
          this.searchTerm = '';
        }, 2000);
      }
    });
  }
}
