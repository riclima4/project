import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ModalController } from '@ionic/angular';
import { HelpComponent } from 'src/app/modals/help/help.component';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: any;
  userType: any;
  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private authService: AuthenticationService
  ) {}

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
    this.authService.logout();
    window.location.reload();
  };
  async openModalHelp() {
    const ModalHelp = await this.modalCtrl.create({
      component: HelpComponent,
    });

    await ModalHelp.present();
  }
  async adminDashboard() {
    this.router.navigateByUrl('/adminDashboard', { replaceUrl: true });
  }
}
