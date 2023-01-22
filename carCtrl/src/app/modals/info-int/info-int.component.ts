import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-info-int',
  templateUrl: './info-int.component.html',
  styleUrls: ['./info-int.component.scss'],
})
export class InfoIntComponent implements OnInit {
  item: any;

  constructor(private modalCtrl: ModalController) {}
  ngOnInit() {}
  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
