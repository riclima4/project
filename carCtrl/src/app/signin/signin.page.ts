import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/api/crud.service';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  constructor(
    private crudService: CrudService,
    private router: Router,
    private authService: AuthenticationService
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
  async login() {
    if (this.emailInput && this.passwordInput) {
      const login = {
        email: this.emailInput,
        password: this.passwordInput,
      };
      console.log(login);
      // this.crudService.create('login', login).subscribe((res) => {
      //   console.log(res);
      //   Preferences.set({ key: 'token', value: res.toString() });
      //   this.router.navigateByUrl('/tab1', { replaceUrl: true });
      // });

      await this.authService.login(login).subscribe(
        async (res) => {
          await this.router.navigateByUrl('/tabs', { replaceUrl: true });
        },
        async (error) => {}
      );
    }
  }
}
