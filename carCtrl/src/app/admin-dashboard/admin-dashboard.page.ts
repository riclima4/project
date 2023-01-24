import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {
  user: any;
  username: any;
  toggleDarkMode: any;
  contentSegment = 1;
  constructor() {}

  ngOnInit() {
    this.getToken();
    this.checkDarkmode();
  }
  changeContent(value: any) {
    this.contentSegment = value;
    console.log(this.contentSegment);
  }
  checkDarkmode = async () => {
    const darkmode = await Preferences.get({ key: 'color-theme' });

    if (darkmode.value == 'dark') {
      document.body.setAttribute('color-theme', 'dark');
      this.toggleDarkMode = true;
      return;
    } else if (darkmode.value == 'light' || darkmode.value == null) {
      document.body.setAttribute('color-theme', 'light');
      this.toggleDarkMode = false;
      return;
    }
  };
  getToken = async () => {
    const token = await Preferences.get({ key: 'token' });

    // console.log(token.value !== null);
    if (token.value !== null) {
      const user = jwt_decode(token.value);
      this.user = user;
      this.username = this.user.username;
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
}
