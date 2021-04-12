import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    httpClientService: HttpClientService
  ) { }

  login(username: string, password: string) {

  }

  register(username: string, password: string) {

  }

  deRegister(username: string, password: string) {

  }

  inviteToProjectGroup (projectId: string, username: string) {

  }

  logout(userId: string, themeList: {}[]) {

  }

  createGroup(userId: string, groupName: string) {

  }
}
