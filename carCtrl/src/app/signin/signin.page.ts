import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/api/crud.service';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  constructor(
    private crudService: CrudService,
    private router: Router,
    private authService: AuthenticationService,
    private toastController: ToastController
  ) {}
  emailInput: any;
  passwordInput: any;
  ngOnInit() {
    //this.checkToken();
  }
  // ionViewWillEnter() {
  //   this.checkToken();
  // }
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
      message: 'Credenciais erradas tente novamente',
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
      // this.crudService.create('login', login).subscribe((res) => {
      //   console.log(res);
      //   Preferences.set({ key: 'token', value: res.toString() });
      //   this.router.navigateByUrl('/tab1', { replaceUrl: true });
      // });

      this.authService.login(login).subscribe(
        async (res) => {
          // console.log(res);
          await this.router.navigateByUrl('/tabs', { replaceUrl: true });
        },
        async (error) => {
          this.presentToast('top');
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
}
