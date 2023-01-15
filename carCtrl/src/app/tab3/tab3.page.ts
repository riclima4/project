import { Preferences } from '@capacitor/preferences';
import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  constructor(
    private translateService: TranslateService,
    private toastController: ToastController
  ) {}

  toggleTheme(event: any) {
    console.log(event);
    if (event.detail.checked) {
      document.body.setAttribute('color-theme', 'dark');
    } else {
      document.body.setAttribute('color-theme', 'light');
    }
  }

  async changeLanguage(language: string) {
    await Preferences.set({ key: 'user-lang', value: language });
    await this.showToast();
  }

  async showToast() {
    const toast = await this.toastController.create({
      message: this.translateService.instant('language sucessfully changed'),
      duration: 4000,
    });
    await toast.present();
  }

  refreshPage() {
    location.reload();
  }
}
