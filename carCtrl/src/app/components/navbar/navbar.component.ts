import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ModalController } from '@ionic/angular';
import { HelpComponent } from 'src/app/modals/help/help.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

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
}
