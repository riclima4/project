import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {
  user: any;
  username: any;
  toggleDarkMode: any;
  contentSegment = 1; //volta para 1 when finished
  type = 'marcas';

  constructor(
    private translateService: TranslateService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.getToken();
    this.checkDarkmode();
  }
  ionViewWillEnter() {
    if (this.user.type != 100) {
      return this.router.navigateByUrl('/', { replaceUrl: true });
    }
  }
  changeContent(value: any) {
    this.contentSegment = value;
    // console.log(this.contentSegment);
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
    // console.log(event);
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
}
