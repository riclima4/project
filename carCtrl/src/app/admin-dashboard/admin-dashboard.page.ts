import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import {
  ActionSheetController,
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import jwt_decode from 'jwt-decode';
import { CrudService } from '../services/api/crud.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {
  user: any;
  username: any;
  toggleDarkMode: any;
  contentSegment = 4; //volta para 1 when finished
  usersArr: any;
  allUsers: any;
  page = 0;
  pageInt = 0;
  resultsCount = 10;
  resultsCountInt = 10;
  sortDirection = 0;
  sortDirection2 = 0;
  sortDirection3 = 0;
  sortKey = null;
  totalPages: number;
  totalPagesInt: number;
  disabledBack: any;
  disabledForward: any;
  disabledBackInt: any;
  disabledForwardInt: any;
  searchTerm: string;
  searchTerm2: string;
  nomeInput: any;
  emailInput: any;
  passwordInput: any;
  passwordConfInput: any;
  typeInput: any;
  typeIntUpdateInput: any;
  hideCreateUser = true;
  hideUpdateUser = true;
  hideCreateInt = true;
  hideUpdateInt = true;
  nomeUpdateInput: any;
  emailUpdateInput: any;
  typeUpdateInput: any;
  idUserUpdateInput: any;
  typeIntInput: any;
  intTypeArr: any;
  allInt: number;
  idIntTypeInput: any;
  type = 'marcas';

  constructor(
    private translateService: TranslateService,
    private toastController: ToastController,
    private crudService: CrudService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    this.getToken();
    this.loadUsersCount();
    this.loadIntCount();
    this.checkDarkmode();
  }
  ionViewWillEnter() {
    if (this.user.type != 100) {
      return this.router.navigateByUrl('/', { replaceUrl: true });
    }
    this.loadUsers();
    this.loadInt();
  }
  // USER LOGIC
  async loadUsers() {
    this.crudService
      .getUsers('users', this.page, this.resultsCount)
      .subscribe((res) => {
        this.usersArr = res.users;
      });
  }
  async loadUsersCount() {
    this.crudService.getUserCount('userCount').subscribe((res) => {
      this.allUsers = res.users.length;
      this.totalPages = Math.ceil(this.allUsers / this.resultsCount);
      console.log(this.totalPages);
      this.disableBtn('user');
    });
  }
  updateUserInput(item: any) {
    this.hideUpdateUser = false;
    this.nomeUpdateInput = item.username;
    this.emailUpdateInput = item.email;
    this.typeUpdateInput = item.type.toString();
    this.hideCreateUser = true;
    this.idUserUpdateInput = item.idUser;
  }
  updateUser() {
    if (this.nomeUpdateInput && this.emailUpdateInput && this.typeUpdateInput) {
      const updatedUser = {
        username: this.nomeUpdateInput,
        email: this.emailUpdateInput,
        type: this.typeUpdateInput,
      };
      console.log(this.idUserUpdateInput);

      this.crudService
        .update('updateUser', this.idUserUpdateInput, updatedUser)
        .subscribe((res) => {
          console.log(res);
        });
      this.loadingSpinner();

      setTimeout(() => {
        this.presentToast('top', 'userEdit');
        this.loadUsers();
        this.hideUpdateUser = true;
      }, 2000);
    } else {
      this.presentToast('top', 'input');
    }
  }
  newUser(form: NgForm) {
    if (
      !this.nomeInput ||
      !this.emailInput ||
      !this.passwordInput ||
      !this.passwordConfInput ||
      !this.typeInput ||
      this.nomeInput == '' ||
      this.emailInput == '' ||
      this.passwordInput == '' ||
      this.passwordConfInput == '' ||
      this.typeInput == ''
    ) {
      return this.presentToast('top', 'input');
    }
    if (this.passwordInput != this.passwordConfInput) {
      return this.presentToast('top', 'password');
    }
    const newUser = {
      username: this.nomeInput,
      email: this.emailInput,
      password: this.passwordInput,
      type: this.typeInput,
    };
    this.crudService.create('newUser', newUser).subscribe((res) => {
      console.log(res);
      if (res == true) {
        return this.presentToast('top', 'user');
      } else {
        this.presentToast('top', 'success');
        setTimeout(() => {
          form.reset();
          this.loadUsersCount();
          this.loadUsers();
        }, 2000);
      }
    });
  }
  async deleteUser(id: number) {
    this.crudService.delete('removeUser', id).subscribe((res) => {});
    this.loadingSpinner();
    setTimeout(() => {
      this.loadUsers();
      this.presentToast('top', 'userDelete');
      this.searchTerm = '';
    }, 2000);
  }
  sortBy(key: any) {
    this.sortKey = key;
    this.sortDirection++;
    this.sort();
  }
  sort() {
    if (this.sortDirection == 1) {
      this.usersArr = this.usersArr.sort((a, b) => {
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        this.sortDirection2 = 0;
        return valA.localeCompare(valB);
      });
    } else if (this.sortDirection == 2) {
      this.usersArr = this.usersArr.sort((a, b) => {
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        this.sortDirection2 = 0;
        return valB.localeCompare(valA);
      });
    } else {
      this.sortDirection = 0;
      this.sortKey = null;
    }
  }
  sortByType(key: any) {
    this.sortKey = key;
    this.sortDirection2++;
    this.sortType();
  }
  sortType() {
    if (this.sortDirection2 == 1) {
      this.usersArr = this.usersArr.sort((a, b) => {
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        this.sortDirection = 0;
        this.sortDirection3 = 0;
        return valA.toString().localeCompare(valB);
      });
    } else if (this.sortDirection2 == 2) {
      this.usersArr = this.usersArr.sort((a, b) => {
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        this.sortDirection = 0;
        this.sortDirection3 = 0;
        return valB.toString().localeCompare(valA.toString());
      });
    } else {
      this.sortDirection2 = 0;
      this.sortKey = null;
    }
  }
  // INTERVENTION LOGIC
  loadInt() {
    this.crudService
      .getIntType('intType', this.pageInt, this.resultsCountInt)
      .subscribe((res) => {
        this.intTypeArr = res.interventionType;
      });
  }
  loadIntCount() {
    this.crudService
      .getInterventionType('interventionType')
      .subscribe((res) => {
        this.allInt = res.interventionType.length;
        this.totalPagesInt = Math.ceil(this.allInt / this.resultsCountInt);
        console.log(this.totalPagesInt);
        this.disableBtn('int');
      });
  }
  updateIntInput(item: any) {
    this.hideUpdateInt = false;
    this.typeIntUpdateInput = item.interventionType;
    this.idIntTypeInput = item.idInterventionType;
    this.hideCreateInt = true;
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
            this.hideUpdateInt = true;
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
      console.log(res);

      this.loadingSpinner();
      setTimeout(() => {
        form.reset();
        this.presentToast('top', 'successInt');
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
          this.presentToast('top', 'intDeleteError');
        }, 2000);
        return;
      } else {
        this.loadingSpinner();
        setTimeout(() => {
          this.loadInt();
          this.presentToast('top', 'intDelete');
          this.searchTerm2 = '';
        }, 2000);
      }
    });
  }
  sortByInt(key: any) {
    this.sortKey = key;
    this.sortDirection3++;
    this.sortInt();
  }
  sortInt() {
    if (this.sortDirection3 == 1) {
      this.intTypeArr = this.intTypeArr.sort((a, b) => {
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        this.sortDirection2 = 0;
        this.sortDirection = 0;
        return valA.localeCompare(valB);
      });
    } else if (this.sortDirection3 == 2) {
      this.intTypeArr = this.intTypeArr.sort((a, b) => {
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        this.sortDirection2 = 0;
        this.sortDirection = 0;
        return valB.localeCompare(valA);
      });
    } else {
      this.sortDirection3 = 0;
      this.sortKey = null;
    }
  }
  // GENERAL LOGIC
  disableBtn(tabela: any) {
    if (tabela == 'user') {
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
    if (tabela == 'int') {
      if (this.pageInt <= 0) {
        this.pageInt = 0;
        this.disabledBackInt = true;
      } else {
        this.disabledBackInt = false;
      }
      if (this.pageInt + 1 >= this.totalPagesInt) {
        this.pageInt = this.totalPagesInt - 1;
        this.disabledForwardInt = true;
      } else {
        this.disabledForwardInt = false;
      }
      return;
    }
  }
  nextPage(tabela: any) {
    if (tabela == 'user') {
      this.page++;
      this.disableBtn('user');
      this.loadUsers();
      return;
    }
    if (tabela == 'int') {
      this.pageInt++;
      this.disableBtn('int');
      this.loadInt();
      return;
    }
  }
  prevPage(tabela: any) {
    if (tabela == 'user') {
      this.page--;
      this.disableBtn('user');
      this.loadUsers();
      return;
    }
    if (tabela == 'int') {
      this.pageInt--;
      this.disableBtn('int');
      this.loadInt();
      return;
    }
  }
  goFirst(tabela: any) {
    if (tabela == 'user') {
      this.page = 0;
      this.disableBtn('user');
      this.loadUsers();
      return;
    }
    if (tabela == 'int') {
      this.pageInt = 0;
      this.disableBtn('int');
      this.loadInt();
      return;
    }
  }
  goLast(tabela: any) {
    if (tabela == 'user') {
      this.page = this.totalPages - 1;
      this.disableBtn('user');
      this.loadUsers();
      return;
    }
    if (tabela == 'int') {
      this.pageInt = this.totalPagesInt - 1;
      this.disableBtn('int');
      this.loadInt();
      return;
    }
  }
  changeContent(value: any) {
    this.contentSegment = value;
    console.log(this.contentSegment);
  }
  async checkDarkmode() {
    const darkmode = await Preferences.get({ key: 'color-theme' });

    if (darkmode.value == 'dark') {
      this.toggleDarkMode = true;
      document.body.setAttribute('color-theme', 'dark');

      return;
    } else if (darkmode.value == 'light' || darkmode.value == null) {
      this.toggleDarkMode = false;
      document.body.setAttribute('color-theme', 'light');
      return;
    }
  }
  async getToken() {
    const token = await Preferences.get({ key: 'token' });

    // console.log(token.value !== null);
    if (token.value !== null) {
      const user = jwt_decode(token.value);
      this.user = user;
      this.username = this.user.username;
      // console.log(this.userID);
    }
  }
  async logout() {
    const token = await Preferences.get({ key: 'token' });

    // console.log(token.value !== null);
    if (token) {
      Preferences.remove({ key: 'token' });
      window.location.reload();
    }
  }
  async changeLanguage(language: string) {
    await Preferences.set({ key: 'user-lang', value: language });

    this.translateService.use(language);
    this.showToast(language);
  }
  async showToast(lng: string) {
    if (lng == 'pt') {
      const toast = await this.toastController.create({
        message: this.translateService.instant('Idioma mudado para Português'),
        duration: 2000,
        position: 'top',
        color: 'success',
      });
      await toast.present();
    } else if (lng == 'en') {
      const toast = await this.toastController.create({
        message: this.translateService.instant('Language Changed to English'),
        duration: 2000,
        position: 'top',
        color: 'success',
      });
      await toast.present();
    }
  }
  async toggleTheme(event: any) {
    console.log(event);
    const dark = await Preferences.get({ key: 'color-theme' });
    if (dark.value == 'dark') {
      document.body.setAttribute('color-theme', 'light');
      await Preferences.set({ key: 'color-theme', value: 'light' });
      this.toggleDarkMode = false;
    } else if (dark.value == 'light' || !dark.value) {
      document.body.setAttribute('color-theme', 'dark');
      await Preferences.set({ key: 'color-theme', value: 'dark' });
      this.toggleDarkMode = true;
    }
  }
  async presentToast(position: 'top' | 'middle' | 'bottom', nome: string) {
    if (nome == 'input') {
      const toast = await this.toastController.create({
        message: this.translateService.instant('toastData'),
        duration: 2000,
        position: position,
        color: 'danger',
      });
      await toast.present();
    } else if (nome == 'password') {
      const toast = await this.toastController.create({
        message: this.translateService.instant('toastPassword'),
        duration: 2000,
        position: position,
        color: 'danger',
      });

      await toast.present();
    } else if (nome == 'success') {
      const toast = await this.toastController.create({
        message: this.translateService.instant('toastSuccess'),
        duration: 2000,
        position: position,
        color: 'success',
      });

      await toast.present();
    } else if (nome == 'user') {
      const toast = await this.toastController.create({
        message: this.translateService.instant('toastEmail'),
        duration: 2000,
        position: position,
        color: 'warning',
      });

      await toast.present();
    } else if (nome == 'successInt') {
      const toast = await this.toastController.create({
        message: this.translateService.instant('toasIntType'),
        duration: 2000,
        position: position,
        color: 'success',
      });

      await toast.present();
    } else if (nome == 'userDelete') {
      const toast = await this.toastController.create({
        message: this.translateService.instant('toastUserDelete'),
        duration: 2000,
        position: position,
        color: 'success',
      });

      await toast.present();
    } else if (nome == 'userEdit') {
      const toast = await this.toastController.create({
        message: this.translateService.instant('toastUserUpdate'),
        duration: 2000,
        position: position,
        color: 'success',
      });

      await toast.present();
    } else if (nome == 'intDelete') {
      const toast = await this.toastController.create({
        message: this.translateService.instant('toastIntTypeDelete'),
        duration: 2000,
        position: position,
        color: 'success',
      });

      await toast.present();
    } else if (nome == 'intEdit') {
      const toast = await this.toastController.create({
        message: this.translateService.instant('toastIntTypeUpdate'),
        duration: 2000,
        position: position,
        color: 'success',
      });

      await toast.present();
    } else if (nome == 'intDeleteError') {
      const toast = await this.toastController.create({
        message: this.translateService.instant('toastIntTypeDeleteError'),
        duration: 2000,
        position: position,
        color: 'danger',
      });

      await toast.present();
    } else if (nome == 'intUpdateError') {
      const toast = await this.toastController.create({
        message: this.translateService.instant('toastIntTypeUpdateError'),
        duration: 2000,
        position: position,
        color: 'danger',
      });

      await toast.present();
    }
  }
  async deleteActionSheet(id: number, nome: string) {
    if (nome == 'user') {
      const actionSheet = await this.actionSheetCtrl.create({
        mode: 'ios',
        header: this.translateService.instant('headerDeleteUser'),
        subHeader: this.translateService.instant('subHeaderDeleteUser'),
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
        this.deleteUser(id);
      }
      return;
    } else if (nome == 'intType') {
      const actionSheet = await this.actionSheetCtrl.create({
        mode: 'ios',
        header: this.translateService.instant('headerDeleteIntType'),
        subHeader: this.translateService.instant('subHeaderDeleteIntType'),
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
        this.deleteIntType(id);
      }
      return;
    }
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
}
