import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { SelabGlobalStorage } from 'src/app/models/store/globalStorage';
import { AuthService } from 'src/app/services/auth.service';
import { getAlertConfig } from '../notifications/alerts.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: AlertConfig, useFactory: getAlertConfig }]
})
export class LoginComponent {
  username: string;
  password: string;
  loginFailed: boolean;

  constructor(private router: Router, private authService: AuthService) {
    this.username = "";
    this.password = "";
    this.loginFailed = false;
  }

  async login() {
    this.authService.login(this.username, this.password)
      .subscribe((response) => {
        console.log(response)
        let userID = JSON.parse(response['body'])["userId"];
        SelabGlobalStorage.startSession(this.username, userID, "");
        this.router.navigate(['index']);
      }, (error) => {
        this.loginFailed = true;
      })
  }
}
