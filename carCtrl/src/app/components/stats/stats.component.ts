import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/api/crud.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  usersCount: any;
  intCount: any;
  carsCount: any;
  intArr: any;
  constructor(private crudService: CrudService) {}

  ngOnInit() {
    this.loadUsersCount();
    this.loadIntCount();
    this.loadCarsCount();
  }
  async loadUsersCount() {
    this.crudService.getUserCount('userCount').subscribe((res) => {
      this.usersCount = res.users.length;
    });
  }
  async loadIntCount() {
    this.crudService.getAllIntervencao('allIntervencoes').subscribe((res) => {
      this.intCount = res.intervencao.length;
    });
  }
  async loadCarsCount() {
    this.crudService.getAllCars('cars').subscribe((res) => {
      this.carsCount = res.cars.length;
    });
  }
}
