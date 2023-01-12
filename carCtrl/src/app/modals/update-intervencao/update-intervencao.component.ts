import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update-intervencao',
  templateUrl: './update-intervencao.component.html',
  styleUrls: ['./update-intervencao.component.scss'],
})
export class UpdateIntervencaoComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}
  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
