import { HelpComponent } from './../modals/help/help.component';
import { Preferences } from '@capacitor/preferences';
import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import {
  ToastController,
  ModalController,
  LoadingController,
} from '@ionic/angular';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  user: any;
  username: any;
  email: any;
  type: any;
  constructor(
    private translateService: TranslateService,
    private toastController: ToastController,

    private router: Router
  ) {}
  ngOnInit() {
    this.checkToken();
    this.getToken();
  }
  ionViewWillEnter() {
    this.username = this.user.username;
    this.email = this.user.email;
    this.type = this.user.type;
  }
  getToken = async () => {
    const token = await Preferences.get({ key: 'token' });

    // console.log(token.value !== null);
    if (token.value !== null) {
      const user = jwt_decode(token.value);
      this.user = user;
      // console.log(this.user);
    }
  };
  async toggleTheme(event: any) {
    console.log(event);
    if (event.detail.checked) {
      document.body.setAttribute('color-theme', 'dark');
      await Preferences.set({ key: 'color-theme', value: 'dark' });
    } else {
      document.body.setAttribute('color-theme', 'light');
      await Preferences.remove({ key: 'color-theme' });
    }
  }
  checkToken = async () => {
    const hasToken = await Preferences.get({ key: 'token' });
    if (hasToken.value === null) {
      this.router.navigateByUrl('/signin', { replaceUrl: true });
    } else {
      this.router.navigateByUrl('/tab3', { replaceUrl: true });
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
      });
      await toast.present();
    } else if (lng == 'en') {
      const toast = await this.toastController.create({
        message: this.translateService.instant('Language Changed to English'),
        duration: 2000,
        position: 'top',
      });
      await toast.present();
    }
  }
}
