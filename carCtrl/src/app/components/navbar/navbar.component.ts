import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ModalController } from '@ionic/angular';
import { HelpComponent } from 'src/app/modals/help/help.component';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private modalCtrl: ModalController, private router: Router) {}
  user: any;
  userType: any;
  ngOnInit() {
    this.getToken();
  }

  getToken = async () => {
    const token = await Preferences.get({ key: 'token' });

    // console.log(token.value !== null);
    if (token.value !== null) {
      const user = jwt_decode(token.value);
      this.user = user;
      this.userType = this.user.type;
      // console.log(this.userID);
    }
  };
  logout = async () => {
    const token = await Preferences.get({ key: 'token' });

    // console.log(token.value !== null);
    if (token) {
      Preferences.remove({ key: 'token' });
      window.location.reload();
    }
  };
  async openModalHelp() {
    const ModalHelp = await this.modalCtrl.create({
      component: HelpComponent,
    });

    await ModalHelp.present();
  }
  async adminDashboard() {
    const token = await Preferences.get({ key: 'token' });
    if (token.value !== null) {
      const user = jwt_decode(token.value);
      const userType = this.user.type;
      // console.log(this.userID);
      if (userType !== 100) {
        return;
      }
      this.router.navigateByUrl('/adminDashboard', { replaceUrl: true });
    }
  }
}
