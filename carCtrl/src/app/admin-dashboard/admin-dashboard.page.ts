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
  contentSegment = 2; //volta para 1 when finished
  usersArr: any;
  allUsers: any;
  page = 0;
  resultsCount = 10;
  sortDirection = 0;
  sortDirection2 = 0;
  sortKey = null;
  totalPages: number;
  disabledBack: any;
  disabledForward: any;
  searchTerm: string;
  nomeInput: any;
  emailInput: any;
  passwordInput: any;
  passwordConfInput: any;
  typeInput: any;
  hideCreateUser = true;
  hideUpdateUser = true;
  nomeUpdateInput: any;
  emailUpdateInput: any;
  typeUpdateInput: any;
  idUserUpdateInput: any;
  constructor(
    private translateService: TranslateService,
    private toastController: ToastController,
    private crudService: CrudService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.getToken();
    this.loadUsersCount();
    this.checkDarkmode();
  }
  ionViewWillEnter() {
    if (this.user.type != 100) {
      return this.router.navigateByUrl('/', { replaceUrl: true });
    }
    this.loadUsers();
  }
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
      this.disableBtn();
    });
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
        return valA.toString().localeCompare(valB);
      });
    } else if (this.sortDirection2 == 2) {
      this.usersArr = this.usersArr.sort((a, b) => {
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        this.sortDirection = 0;
        return valB.toString().localeCompare(valA.toString());
      });
    } else {
      this.sortDirection2 = 0;
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
  }
  nextPage() {
    this.page++;
    this.disableBtn();
    this.loadUsers();
  }
  prevPage() {
    this.page--;
    this.disableBtn();
    this.loadUsers();
  }
  goFirst() {
    this.page = 0;
    this.disableBtn();
    this.loadUsers();
  }
  goLast() {
    this.page = this.totalPages - 1;
    this.disableBtn();
    this.loadUsers();
  }
  changeContent(value: any) {
    this.contentSegment = value;
    console.log(this.contentSegment);
  }
  checkDarkmode = async () => {
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
  };
  getToken = async () => {
    const token = await Preferences.get({ key: 'token' });

    // console.log(token.value !== null);
    if (token.value !== null) {
      const user = jwt_decode(token.value);
      this.user = user;
      this.username = this.user.username;
      // console.log(this.userID);
    }
  };
  logout = async () => {
    const token = await Preferences.get({ key: 'token' });

    // console.log(token.value !== null);
    if (token) {
      Preferences.remove({ key: 'token' });
      window.location.reload();
    }
  };
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
        message: 'Dados inválidos tenta outra vez',
        duration: 2000,
        position: position,
        color: 'danger',
      });
      await toast.present();
    } else if (nome == 'password') {
      const toast = await this.toastController.create({
        message: 'As passwords não coincidem tenta outra vez',
        duration: 2000,
        position: position,
        color: 'danger',
      });

      await toast.present();
    } else if (nome == 'success') {
      const toast = await this.toastController.create({
        message: 'Utilizador criado com sucesso',
        duration: 2000,
        position: position,
        color: 'success',
      });

      await toast.present();
    } else if (nome == 'user') {
      const toast = await this.toastController.create({
        message: 'O email já está a ser utilizado',
        duration: 2000,
        position: position,
        color: 'warning',
      });

      await toast.present();
    }
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
        this.presentToast2('top');
        this.loadUsers();
        this.hideUpdateUser = true;
      }, 2000);
    } else {
      this.presentAlert();
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
  async deleteUserActionSheet(id: number) {
    const actionSheet = await this.actionSheetCtrl.create({
      mode: 'ios',
      header: 'O Utilizador e todas as suas informações vão ser removidas',
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
      this.deleteUser(id);
    }
  }
  async presentToastDelete(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Utilizador eliminado com sucesso',
      duration: 2000,
      position: position,
      color: 'success',
    });

    await toast.present();
  }
  async deleteUser(id: number) {
    this.crudService.delete('removeUser', id).subscribe((res) => {});
    this.loadingSpinner();
    setTimeout(() => {
      this.loadUsers();
      this.presentToastDelete('top');
      this.searchTerm = '';
    }, 2000);
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
  async presentToast2(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Utilizador editado com sucesso',
      duration: 2000,
      position: position,
      color: 'success',
    });

    await toast.present();
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
}
