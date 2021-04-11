import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { SelabGlobalStorage } from 'src/app/models/store/globalStorage';
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

  constructor(private router: Router) {
    this.username = "";
    this.password = "";
    this.loginFailed = false;
  }

  async login() {
    await axios.post('http://localhost:8083/selab/auth/login', {
      username: this.username,
      password: this.password,
    }).then((response) => {
      console.log(response)
      let status = response.status;
      if (response['data'] == 'authentication failed') {
        this.loginFailed = true;
      }
      else {
        let userID = response['data']["userId"];
        //let groupID = response['data']["groupId"];
        SelabGlobalStorage.startSession(this.username, userID, "");
        this.router.navigate(['index']);
      }
    }, (error) => {
      this.loginFailed = true;
    })
  }
}