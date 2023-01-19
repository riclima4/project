import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { ToastController } from '@ionic/angular';
import { CrudService } from '../services/api/crud.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  nomeInput: any;
  emailInput: any;
  passwordInput: any;
  passwordConfInput: any;
  constructor(
    private toastController: ToastController,
    private crudService: CrudService,
    private router: Router,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.checkDarkmode();
  }
  checkDarkmode = async () => {
    const darkmode = await Preferences.get({ key: 'color-theme' });
    if (darkmode.value == 'dark') {
      document.body.setAttribute('color-theme', 'dark');
    } else {
      document.body.setAttribute('color-theme', 'light');
    }
  };
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
        position: 'bottom',
        color: 'success',
      });
      await toast.present();
    } else if (lng == 'en') {
      const toast = await this.toastController.create({
        message: this.translateService.instant('Language Changed to English'),
        duration: 2000,
        position: 'bottom',
        color: 'success',
      });
      await toast.present();
    }
  }
  newUser() {
    if (
      !this.nomeInput ||
      !this.emailInput ||
      !this.passwordInput ||
      !this.passwordConfInput ||
      this.nomeInput == '' ||
      this.emailInput == '' ||
      this.passwordInput == '' ||
      this.passwordConfInput == ''
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
    };
    this.crudService.create('newUser', newUser).subscribe((res) => {
      console.log(res);
      if (res == true) {
        return this.presentToast('top', 'user');
      } else {
        this.presentToast('top', 'success');
        setTimeout(() => {
          this.router.navigateByUrl('/signin', { replaceUrl: true });
        }, 2000);
      }
    });
  }
}
