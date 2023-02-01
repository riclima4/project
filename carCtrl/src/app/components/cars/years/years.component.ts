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
  selector: 'app-years',
  templateUrl: './years.component.html',
  styleUrls: ['./years.component.scss'],
})
export class YearsComponent implements OnInit {
  yearArr: any;
  page = 0;
  resultsCount = 10;
  totalPages: number;
  sortDirection = 0;
  sortKey = null;
  allYears: any;
  disabledBack: any;
  disabledForward: any;
  searchTerm: string;
  yearInput: any;
  yearUpdateInput: any;
  idYearUpdateInput: any;
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
    this.loadYearsCount();
    this.loadYears();
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
        message: 'Ano adicionado com sucesso',
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
        message: 'Ano editado com sucesso',
        duration: 2000,
        position: position,
        color: 'success',
      });

      await toast.present();
    } else if (nome == 'delete') {
      const toast = await this.toastController.create({
        message: 'Ano eliminado com sucesso',
        duration: 2000,
        position: position,
        color: 'success',
      });

      await toast.present();
    } else if (nome == 'deleteError') {
      const toast = await this.toastController.create({
        message:
          'O Ano não pode ser eliminado pois contem carros adicionados com este ano. ',
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
      this.yearArr = this.yearArr.sort((a, b) => {
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        return valA.localeCompare(valB);
      });
    } else if (this.sortDirection == 2) {
      this.yearArr = this.yearArr.sort((a, b) => {
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
    this.loadYears();
    return;
  }
  prevPage() {
    this.page--;
    this.disableBtn();
    this.loadYears();
    return;
  }
  goFirst() {
    this.page = 0;
    this.disableBtn();
    this.loadYears();
    return;
  }
  goLast() {
    this.page = this.totalPages - 1;
    this.disableBtn();
    this.loadYears();
    return;
  }
  async loadYears() {
    this.crudService
      .getYearTable('yearsTable', this.page, this.resultsCount)
      .subscribe((res) => {
        this.yearArr = res.years;
        console.log(this.yearArr);
      });
  }
  async loadYearsCount() {
    this.crudService.getYear('years').subscribe((res) => {
      this.allYears = res.years.length;
      this.totalPages = Math.ceil(this.allYears / this.resultsCount);
      console.log(this.totalPages);
      this.disableBtn();
    });
  }
  newYear(form: NgForm) {
    if (
      !this.yearInput ||
      this.yearInput == '' ||
      this.yearInput == ' ' ||
      this.yearInput < 0
    ) {
      return this.presentToast('top', 'input');
    }
    const newYear = {
      year: this.yearInput,
    };
    console.log(newYear);

    this.crudService.create('newYear', newYear).subscribe((res) => {
      console.log(res);
      this.loadingSpinner();
      setTimeout(() => {
        form.reset();
        this.presentToast('top', 'success');
        this.loadYearsCount();
        this.loadYears();
        this.hideCreate = true;
        this.hideBtn = false;
      }, 2000);
    });
  }
  getAll() {
    if (this.searchTerm == '') {
      this.resultsCount = 10;
      return;
    }
    this.crudService.getGasType('combustivel').subscribe((res) => {
      this.resultsCount = res.gasType.length;
      console.log(this.totalPages);
      this.disableBtn();
    });
  }
  updateInputYear(item: any) {
    this.yearUpdateInput = item.year;
    this.idYearUpdateInput = item.idYear;
    this.hideUpdate = false;
    this.hideCreate = true;
    this.hideBtn = false;
  }
  updateYear() {
    if (this.yearUpdateInput) {
      const updatedYear = {
        idYear: this.idYearUpdateInput,
        year: this.yearUpdateInput,
      };
      console.log(updatedYear);

      this.crudService
        .update('updateYear', this.idYearUpdateInput, updatedYear)
        .subscribe((res) => {
          console.log(res);
          this.page = 0;
          this.disableBtn();
        });
      this.loadingSpinner();

      setTimeout(() => {
        this.presentToast('top', 'edit');
        this.loadYears();
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
      header: 'O Ano e todas as suas informações vão ser removidas',
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
    this.crudService.delete('deleteYear', id).subscribe((res) => {
      if (res == '401') {
        this.loadingSpinner();
        setTimeout(() => {
          return this.presentToast('top', 'deleteError');
        }, 2000);
      } else {
        this.loadingSpinner();
        setTimeout(() => {
          this.loadYears();
          this.presentToast('top', 'delete');
          this.searchTerm = '';
          this.hideBtn = false;
        }, 2000);
      }
    });
  }
}
