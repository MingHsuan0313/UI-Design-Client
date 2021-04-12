import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SelabGlobalStorage } from '../models/store/globalStorage';

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

  logout(themeIDs: any[]) {
    let uri = `${this.url}/logout`;

    return this.httpClient.post(uri,
      {
        'themeIDs': themeIDs
      }, {
      headers: {
        projectName: SelabGlobalStorage.getProjectName(),
        userID: SelabGlobalStorage.getUserID()
      },
      observe: "response",
      responseType: "text"
    })
  }

  deRegister(username: string, password: string) {

  }

  createGroup(name: string, userId: string) {
    let uri = `${this.url}/group`;

    return this.httpClient.post(uri, {
      'name': name
    }, {
      headers: {
        'userID': userId
      },
      observe: "response",
      responseType: "text"
    })
  }

  inviteToProjectGroup(projectId: string, username: string) {
    let uri = `${this.url}/group`;

    return this.httpClient.put(uri, {}, {
      headers: {
        projectID: projectId,
        userName: username
      },
      observe: "response",
      responseType: "text"
    })
  }

  getGroupMembersByProjectId(projectId: string) {
    let uri = `${this.url}/project/members`;

    return this.httpClient.get(uri, {
      headers: {
        "projectId": projectId
      },
      observe: "response",
      responseType: "text"
    })
  }
}
