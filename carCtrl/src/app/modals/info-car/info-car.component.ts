import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-info-car',
  templateUrl: './info-car.component.html',
  styleUrls: ['./info-car.component.scss'],
})
export class InfoCarComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}
  item: any;

  ngOnInit() {}
  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
