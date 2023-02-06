import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss();
  }
  openPlayList() {
    window.open(
      'https://www.youtube.com/playlist?list=PLq2YjDQLtrfJB44FH0yq7qKH9hPBiMwoB',
      '_blank'
    );
  }
}
