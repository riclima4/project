import { Preferences } from '@capacitor/preferences';
import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { CrudService } from '../services/api/crud.service';

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
  intervencoes: any;
  totalPrice: any;
  carAndPrice: Array<any> = [];
  toggleDarkMode: any;

  carros: any;
  constructor(
    private translateService: TranslateService,
    private toastController: ToastController,
    private router: Router,
    private crudService: CrudService
  ) {}
  ngOnInit() {
    this.checkToken();
    this.getToken();
    this.checkDarkmode();
  }
  ionViewWillEnter() {
    this.username = this.user.username;
    this.email = this.user.email;
    this.type = this.user.type;
    this.loadCarros();
    this.loadIntervencoesTotalPrice();
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
      this.toggleDarkMode = true;
    } else {
      document.body.setAttribute('color-theme', 'light');
      await Preferences.set({ key: 'color-theme', value: 'light' });
      this.toggleDarkMode = false;
    }
  }
  checkDarkmode = async () => {
    const darkmode = await Preferences.get({ key: 'color-theme' });
    if (darkmode.value == 'dark') {
      document.body.setAttribute('color-theme', 'dark');
      this.toggleDarkMode = true;
      return;
    } else if (darkmode.value === 'light' || !darkmode) {
      document.body.setAttribute('color-theme', 'light');
      this.toggleDarkMode = false;
      return;
    }
  };
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
  async loadCarros() {
    this.carAndPrice = [];
    this.crudService.getCars('car', this.user.idUser).subscribe((res) => {
      this.carros = res.cars;
      // console.log(this.carros);
      this.carros.forEach((item: any) => {
        this.crudService
          .getCars('carByIdPrice', item.idCarro)
          .subscribe((res) => {
            const objPriceAndCar = {
              nome: item.nome,
              price: res,
            };
            this.carAndPrice.push(objPriceAndCar);
            // console.log(this.carAndPrice);
            return;
          });
      });
    });
  }
  async loadIntervencoesTotalPrice() {
    this.totalPrice = 0;
    this.crudService
      .getIntervencao('intervencoes', this.user.idUser)
      .subscribe((res) => {
        this.intervencoes = res.intervencao;
        // console.log(this.intervencoes);
        this.intervencoes.forEach((element: any) => {
          this.totalPrice = this.totalPrice + element.price;
        });
      });
  }
}
