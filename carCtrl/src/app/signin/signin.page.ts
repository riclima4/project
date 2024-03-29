import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  emailInput: any;
  passwordInput: any;
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private toastController: ToastController,
    private translateService: TranslateService,
    private loadingCtrl: LoadingController
  ) {}
  ngOnInit() {
    this.checkDarkmode();
  }
  async loadingSpinner() {
    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      mode: 'ios',
      duration: 2000,
    });
    await loading.present();
  }
  checkDarkmode = async () => {
    const darkmode = await Preferences.get({ key: 'color-theme' });
    if (darkmode.value == 'dark') {
      document.body.setAttribute('color-theme', 'dark');
    } else {
      document.body.setAttribute('color-theme', 'light');
    }
  };
  checkToken = async () => {
    const hasToken = await Preferences.get({ key: 'token' });
    if (hasToken.value === null) {
      this.router.navigateByUrl('/signin', { replaceUrl: true });
    } else {
      this.router.navigateByUrl('/tab1', { replaceUrl: true });
    }
  };
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: this.translateService.instant('toastCred'),
      duration: 2000,
      position: position,
      color: 'danger',
    });

    await toast.present();
  }
  async login() {
    if (this.emailInput && this.passwordInput) {
      const login = {
        email: this.emailInput,
        password: this.passwordInput,
      };
      this.authService.login(login).subscribe(
        async (res) => {
          // console.log(res);
          this.loadingSpinner();
          setTimeout(async () => {
            await this.router.navigateByUrl('/tabs', { replaceUrl: true });
          }, 2000);
        },
        async (error) => {
          this.loadingSpinner();
          setTimeout(() => {
            this.presentToast('top');
          }, 2000);
        }
      );
    } else {
      if (
        !this.emailInput ||
        !this.passwordInput ||
        this.emailInput == '' ||
        this.passwordInput == ''
      ) {
        this.presentToast('top');
      }
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
}
