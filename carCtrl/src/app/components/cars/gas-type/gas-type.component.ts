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
  selector: 'app-gas-type',
  templateUrl: './gas-type.component.html',
  styleUrls: ['./gas-type.component.scss'],
})
export class GasTypeComponent implements OnInit {
  gasTypeArr: any;
  page = 0;
  resultsCount = 10;
  totalPages: number;
  sortDirection = 0;
  sortKey = null;
  allGasType: any;
  disabledBack: any;
  disabledForward: any;
  searchTerm: string;
  gasTypeInput: any;
  gasTypeUpdateInput: any;
  idGasTypeUpdateInput: any;
  hideUpdate = true;
  hideCreate = true;
  hideBtn = false;

  constructor(
    private translateService: TranslateService,
    private crudService: CrudService,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    this.loadGasTypeCount();
    this.loadGasType();
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
        message: this.translateService.instant('toastGastypeSuccess'),
        duration: 2000,
        position: position,
        color: 'success',
      });
      await toast.present();
    } else if (nome == 'input') {
      const toast = await this.toastController.create({
        message: this.translateService.instant('toastData'),
        duration: 2000,
        position: position,
        color: 'danger',
      });
      await toast.present();
    } else if (nome == 'edit') {
      const toast = await this.toastController.create({
        message: this.translateService.instant('toastGastypeUpdate'),
        duration: 2000,
        position: position,
        color: 'success',
      });

      await toast.present();
    } else if (nome == 'delete') {
      const toast = await this.toastController.create({
        message: this.translateService.instant('toastGastypeDelete'),
        duration: 2000,
        position: position,
        color: 'success',
      });

      await toast.present();
    } else if (nome == 'deleteError') {
      const toast = await this.toastController.create({
        message: this.translateService.instant('toastGastypeDeleteError'),
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
      this.gasTypeArr = this.gasTypeArr.sort((a, b) => {
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        return valA.localeCompare(valB);
      });
    } else if (this.sortDirection == 2) {
      this.gasTypeArr = this.gasTypeArr.sort((a, b) => {
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
    this.loadGasType();
    return;
  }
  prevPage() {
    this.page--;
    this.disableBtn();
    this.loadGasType();
    return;
  }
  goFirst() {
    this.page = 0;
    this.disableBtn();
    this.loadGasType();
    return;
  }
  goLast() {
    this.page = this.totalPages - 1;
    this.disableBtn();
    this.loadGasType();
    return;
  }
  async loadGasType() {
    this.crudService
      .getGasTypeTable('combustivelTable', this.page, this.resultsCount)
      .subscribe((res) => {
        this.gasTypeArr = res.gasType;
        // console.log(this.gasTypeArr);
      });
  }
  async loadGasTypeCount() {
    this.crudService.getGasType('combustivel').subscribe((res) => {
      this.allGasType = res.gasType.length;
      this.totalPages = Math.ceil(this.allGasType / this.resultsCount);
      // console.log(this.totalPages);
      this.disableBtn();
    });
  }
  newGasType(form: NgForm) {
    if (
      !this.gasTypeInput ||
      this.gasTypeInput == '' ||
      this.gasTypeInput == ' '
    ) {
      return this.presentToast('top', 'input');
    }
    const newGasType = {
      gasType: this.gasTypeInput,
    };
    // console.log(newGasType);

    this.crudService.create('newCombustivel', newGasType).subscribe((res) => {
      // console.log(res);
      this.loadingSpinner();
      setTimeout(() => {
        form.reset();
        this.presentToast('top', 'success');
        this.page = 0;
        this.loadGasTypeCount();
        this.loadGasType();
        this.hideCreate = true;
        this.hideBtn = false;
      }, 2000);
    });
  }
  getAll() {
    this.page = 0;
    if (this.searchTerm == '') {
      this.resultsCount = 10;
      return;
    }
    this.crudService.getGasType('combustivel').subscribe((res) => {
      if (res.gasType.length <= 0) {
        this.resultsCount = 10;
        this.disableBtn();
        return;
      } else {
        this.resultsCount = res.gasType.length;
        // console.log(this.totalPages);
        this.disableBtn();
      }
    });
  }
  updateInputMarca(item: any) {
    this.gasTypeUpdateInput = item.gasType;
    this.idGasTypeUpdateInput = item.idGasType;
    this.hideUpdate = false;
    this.hideCreate = true;
    this.hideBtn = false;
  }
  updateGasType() {
    if (this.gasTypeUpdateInput) {
      const updatedGasType = {
        idGasType: this.idGasTypeUpdateInput,
        gasType: this.gasTypeUpdateInput,
      };
      // console.log(updatedGasType);

      this.crudService
        .update('updateGasType', this.idGasTypeUpdateInput, updatedGasType)
        .subscribe((res) => {
          // console.log(res);
          this.page = 0;
          this.disableBtn();
        });
      this.loadingSpinner();

      setTimeout(() => {
        this.presentToast('top', 'edit');
        this.loadGasType();
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
      header: this.translateService.instant('headerDeleteGasType'),
      subHeader: this.translateService.instant('subHeaderDeleteGasType'),
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
    this.crudService.delete('deleteGasType', id).subscribe((res) => {
      if (res == '401') {
        this.loadingSpinner();
        setTimeout(() => {
          return this.presentToast('top', 'deleteError');
        }, 2000);
      } else {
        this.loadingSpinner();
        setTimeout(() => {
          this.page = 0;
          this.loadGasType();
          this.presentToast('top', 'delete');
          this.searchTerm = '';
          this.hideBtn = false;
        }, 2000);
      }
    });
  }
}
