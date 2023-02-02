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
  selector: 'app-interventions',
  templateUrl: './interventions.component.html',
  styleUrls: ['./interventions.component.scss'],
})
export class InterventionsComponent implements OnInit {
  page = 0;
  resultsCount = 10;
  totalPages: number;
  sortDirection = 0;
  sortKey = null;
  allInt: any;
  disabledBack: any;
  disabledForward: any;
  searchTerm: string;
  typeIntInput: any;
  modeloInput: any;
  modeloUpdateInput: any;
  typeIntUpdateInput: any;
  hideUpdate = true;
  hideCreate = true;
  hideBtn = false;
  idIntTypeInput: any;
  intTypeArr: any;
  constructor(
    private translateService: TranslateService,
    private crudService: CrudService,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    this.loadIntCount();
    this.loadInt();
  }
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
  nextPage() {
    this.page++;
    this.disableBtn();
    this.loadInt();
    return;
  }
  prevPage() {
    this.page--;
    this.disableBtn();
    this.loadInt();
    return;
  }
  goFirst() {
    this.page = 0;
    this.disableBtn();
    this.loadInt();
    return;
  }
  goLast() {
    this.page = this.totalPages - 1;
    this.disableBtn();
    this.loadInt();
    return;
  }
  async presentToast(position: 'top' | 'middle' | 'bottom', nome: string) {
    if (nome == 'success') {
      const toast = await this.toastController.create({
        message: this.translateService.instant('toasIntType'),
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
        message: this.translateService.instant('toastIntTypeUpdate'),
        duration: 2000,
        position: position,
        color: 'success',
      });

      await toast.present();
    } else if (nome == 'delete') {
      const toast = await this.toastController.create({
        message: this.translateService.instant('toastIntTypeDelete'),
        duration: 2000,
        position: position,
        color: 'success',
      });

      await toast.present();
    } else if (nome == 'deleteError') {
      const toast = await this.toastController.create({
        message: this.translateService.instant('toastIntTypeDeleteError'),
        duration: 2000,
        position: position,
        color: 'danger',
      });

      await toast.present();
    }
  }
  getAll() {
    if (this.searchTerm == '') {
      this.resultsCount = 10;

      return;
    }
    this.crudService
      .getInterventionType('interventionType')
      .subscribe((res) => {
        this.resultsCount = res.interventionType.length;
        // console.log(this.totalPages);
        this.disableBtn();
      });
  }
  loadInt() {
    this.page = 0;
    this.crudService
      .getIntType('intType', this.page, this.resultsCount)
      .subscribe((res) => {
        this.intTypeArr = res.interventionType;
      });
  }
  loadIntCount() {
    this.crudService
      .getInterventionType('interventionType')
      .subscribe((res) => {
        this.allInt = res.interventionType.length;
        this.totalPages = Math.ceil(this.allInt / this.resultsCount);
        // console.log(this.totalPages);
        this.disableBtn();
      });
  }
  updateIntInput(item: any) {
    this.typeIntUpdateInput = item.interventionType;
    this.idIntTypeInput = item.idInterventionType;
    this.hideCreate = true;
    this.hideUpdate = false;
    this.hideBtn = false;
  }
  updateIntType() {
    if (this.typeIntUpdateInput) {
      const updatedIntType = {
        idInterventionType: this.idIntTypeInput,
        interventionType: this.typeIntUpdateInput,
      };
      console.log(updatedIntType);

      this.crudService
        .update('updateIntType', this.idIntTypeInput, updatedIntType)
        .subscribe((res) => {
          if (res == '401') {
            this.loadingSpinner();
            setTimeout(() => {
              this.presentToast('top', 'intUpdateError');
            }, 2000);
            return;
          }
          this.loadingSpinner();
          setTimeout(() => {
            this.presentToast('top', 'intEdit');
            this.loadInt();
            this.hideUpdate = true;
          }, 2000);
        });
    } else {
      this.presentToast('top', 'input');
    }
  }
  newIntType(form: NgForm) {
    if (
      !this.typeIntInput ||
      this.typeIntInput == '' ||
      this.typeIntInput == ' '
    ) {
      return this.presentToast('top', 'input');
    }
    const newType = {
      interventionType: this.typeIntInput,
    };
    this.crudService.create('newIntType', newType).subscribe((res) => {
      // console.log(res);

      this.loadingSpinner();
      setTimeout(() => {
        form.reset();
        this.presentToast('top', 'success');
        this.loadIntCount();
        this.loadInt();
      }, 2000);
    });
  }
  async deleteIntType(id: number) {
    this.crudService.delete('deleteIntType', id).subscribe((res) => {
      if (res == '401') {
        this.loadingSpinner();
        setTimeout(() => {
          this.presentToast('top', 'deleteError');
        }, 2000);
        return;
      } else {
        this.loadingSpinner();
        setTimeout(() => {
          this.loadInt();
          this.presentToast('top', 'delete');
          this.searchTerm = '';
        }, 2000);
      }
    });
  }
  sortBy(key: any) {
    this.sortKey = key;
    this.sortDirection++;
    this.sort();
  }
  sort() {
    if (this.sortDirection == 1) {
      this.intTypeArr = this.intTypeArr.sort((a, b) => {
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        return valA.localeCompare(valB);
      });
    } else if (this.sortDirection == 2) {
      this.intTypeArr = this.intTypeArr.sort((a, b) => {
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
  async deleteActionSheet(id: number) {
    this.hideUpdate = true;
    const actionSheet = await this.actionSheetCtrl.create({
      mode: 'ios',
      header: this.translateService.instant('headerDeleteInt'),
      subHeader: this.translateService.instant('subHeaderDeleteInt'),
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
    this.crudService.delete('deleteIntType', id).subscribe((res) => {
      if (res == '401') {
        this.loadingSpinner();
        setTimeout(() => {
          return this.presentToast('top', 'deleteError');
        }, 2000);
      } else {
        this.loadingSpinner();
        setTimeout(() => {
          this.loadInt();
          this.presentToast('top', 'delete');
          this.searchTerm = '';
        }, 2000);
      }
    });
  }
}
