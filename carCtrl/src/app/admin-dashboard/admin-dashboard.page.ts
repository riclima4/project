import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { LoadingController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ChartDataset, LabelItem } from 'chart.js';
import {
  ChartConfiguration,
  ChartData,
  ChartType,
} from 'chart.js/dist/types/index';
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
  contentSegment = 1; //volta para 1 when finished
  type = 'marcas';
  intCount: any;
  intTypeArr: any;
  chartLoaded = false;

  constructor(
    private translateService: TranslateService,
    private toastController: ToastController,
    private router: Router,
    private crudService: CrudService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.getToken();
    this.checkDarkmode();
    this.loadCountIntbyType();
  }
  ionViewWillEnter() {
    if (this.user.type != 100) {
      return this.router.navigateByUrl('/', { replaceUrl: true });
    }
  }
  changeContent(value: any) {
    this.contentSegment = value;
    if (value == 1) {
      this.chartLoaded = false;
      this.loadCountIntbyType();
    }
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

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    animation: {
      duration: 0,
    },
    maintainAspectRatio: false,
    // We use these empty structures as placeholders for dynamic theming.
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: 'Intervenções' }],
  };

  async loadCountIntbyType() {
    this.chartLoaded = false;
    this.barChartData.labels = [];
    this.barChartData.datasets[0].data = [];
    this.crudService
      .getInterventionType('interventionType')
      .subscribe((res) => {
        this.intTypeArr = res.interventionType;
        for (let type of this.intTypeArr) {
          this.barChartData.labels.push(type.interventionType);
          this.crudService
            .getIntervencao('intervencoesByType', type.idInterventionType)
            .subscribe((res) => {
              this.intCount = res.intervencao.length;
              this.barChartData.datasets[0].data.push(this.intCount);
            });
        }
        this.loadingGraphs();
        setTimeout(() => {
          this.chartLoaded = true;
        }, 2000);
      });
  }
  async loadingGraphs() {
    const loading = await this.loadingCtrl.create({
      message: 'A carregar gráficos',
      spinner: 'crescent',
      mode: 'ios',
      duration: 2000,
    });
    await loading.present();
  }
}
