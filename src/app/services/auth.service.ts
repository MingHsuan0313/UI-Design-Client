import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string;
  constructor(
    private httpClient: HttpClient,
  ) {
    this.url = `http://${'localhost:8083'}/selab/auth`
  }

  login(username: string, password: string) {
    let uri = `${this.url}/login`;

    return this.httpClient.post(uri,
      {
        'username': username,
        'password': password
      },
      {
        observe: "response",
        responseType: "text"
      }
    )
}

register(username: string, password: string) {
  let uri = `${this.url}/register`;

  return this.httpClient.post(uri,
      {
        'username': username,
        'password': password
      },
      {
        observe: "response",
        responseType: "text"
      }
  )
}

deRegister(username: string, password: string) {

}

inviteToProjectGroup(projectId: string, username: string) {

}

logout(userId: string, themeList: {}[]) {

}

createGroup(userId: string, groupName: string) {

}
}
