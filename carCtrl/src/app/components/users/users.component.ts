import { Component, OnInit } from '@angular/core';
import {
  ActionSheetController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { CrudService } from 'src/app/services/api/crud.service';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import { Preferences } from '@capacitor/preferences';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
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
  hideCreate = true;
  hideUpdate = true;
  hideBtn = false;
  nomeUpdateInput: any;
  emailUpdateInput: any;
  typeUpdateInput: any;
  idUserUpdateInput: any;
  user: any;
  userEmailToken: any;
  constructor(
    private translateService: TranslateService,
    private toastController: ToastController,
    private crudService: CrudService,
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    this.getToken();
    this.loadUsersCount();
    this.loadUsers();
  }
  async getToken() {
    const token = await Preferences.get({ key: 'token' });

    // console.log(token.value !== null);
    if (token.value !== null) {
      const user = jwt_decode(token.value);
      this.user = user;
      this.userEmailToken = this.user.email;
      // console.log(this.userEmailToken);
    }
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
      // console.log(this.totalPages);
      this.disableBtn();
    });
  }
  updateUserInput(item: any) {
    this.hideBtn = false;
    this.hideCreate = true;
    this.hideUpdate = false;
    this.typeUpdateInput = '';
    setTimeout(() => {
      this.typeUpdateInput = item.type.toString();
    }, 1);

    this.idUserUpdateInput = item.idUser;
    this.nomeUpdateInput = item.username;
    this.emailUpdateInput = item.email;
  }
  updateUser() {
    if (this.nomeUpdateInput && this.emailUpdateInput && this.typeUpdateInput) {
      const updatedUser = {
        username: this.nomeUpdateInput,
        email: this.emailUpdateInput,
        type: this.typeUpdateInput,
      };
      // console.log(this.idUserUpdateInput);

      this.crudService
        .update('updateUser', this.idUserUpdateInput, updatedUser)
        .subscribe((res) => {
          // console.log(res);
        });
      this.loadingSpinner();

      setTimeout(() => {
        this.presentToast('top', 'update');
        this.loadUsers();
        this.hideUpdate = true;
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
      // console.log(res);
      if (res == true) {
        return this.presentToast('top', 'user');
      } else {
        this.loadingSpinner();
        setTimeout(() => {
          form.reset();
          this.presentToast('top', 'success');
          this.loadUsersCount();
          this.loadUsers();
          this.hideCreate = true;
          this.hideBtn = false;
        }, 2000);
      }
    });
  }
  async deleteUser(user: any) {
    if (user.email == this.userEmailToken) {
      return this.presentToast('top', 'deleteLogged');
    } else {
      this.crudService.delete('removeUser', user.idUser).subscribe((res) => {});
      this.loadingSpinner();
      setTimeout(() => {
        this.loadUsers();
        this.presentToast('top', 'delete');
        this.searchTerm = '';
      }, 2000);
    }
  }
  sortBy(key: any) {
    if (key == 'email') {
      this.sortKey = key;
      this.sortDirection++;
      this.sort();
    } else if (key == 'type') {
      this.sortKey = key;
      this.sortDirection2++;
      this.sortType();
    }
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
    return;
  }
  nextPage() {
    this.page++;
    this.disableBtn();
    this.loadUsers();
    return;
  }
  prevPage() {
    this.page--;
    this.disableBtn();
    this.loadUsers();
    return;
  }
  goFirst() {
    this.page = 0;
    this.disableBtn();
    this.loadUsers();
    return;
  }
  goLast() {
    this.page = this.totalPages - 1;
    this.disableBtn();
    this.loadUsers();
    return;
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
    } else if (nome == 'delete') {
      const toast = await this.toastController.create({
        message: this.translateService.instant('toastUserDelete'),
        duration: 2000,
        position: position,
        color: 'success',
      });

      await toast.present();
    } else if (nome == 'deleteLogged') {
      const toast = await this.toastController.create({
        message: this.translateService.instant('toastUserDeleteError'),
        duration: 2000,
        position: position,
        color: 'danger',
      });

      await toast.present();
    } else if (nome == 'update') {
      const toast = await this.toastController.create({
        message: this.translateService.instant('toastUserUpdate'),
        duration: 2000,
        position: position,
        color: 'success',
      });

      await toast.present();
    }
  }
  async deleteActionSheet(user: any) {
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
      this.deleteUser(user);
    }
    return;
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
  getAll() {
    if (this.searchTerm == '') {
      this.resultsCount = 10;

      return;
    }
    this.crudService.getUserCount('userCount').subscribe((res) => {
      this.resultsCount = res.users.length;
      // console.log(this.totalPages);
      this.disableBtn();
    });
  }
}
