import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-intervencao',
  templateUrl: './create-intervencao.component.html',
  styleUrls: ['./create-intervencao.component.scss'],
})
export class CreateIntervencaoComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}
  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
