import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CrudService } from '../services/api/crud.service';

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
    private router: Router
  ) {}

  ngOnInit() {}
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
