import { HttpResponse } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatTabChangeEvent } from '@angular/material';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { SelabGlobalStorage } from 'src/app/models/store/globalStorage';
import { AuthService } from 'src/app/services/auth.service';
import { getAlertConfig } from '../notifications/alerts.component';

@Component({
  selector: 'app-project-group-setting-dialog',
  templateUrl: './project-group-setting-dialog.component.html',
  styleUrls: ['./project-group-setting-dialog.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: AlertConfig, useFactory: getAlertConfig }]
})
export class ProjectGroupSettingDialogComponent implements OnInit {
  hasWarningMessage: boolean;
  warningMessage: string;
  invitedUsername: string;
  groupUserList: any[];

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<ProjectGroupSettingDialogComponent>
  ) {
    this.hasWarningMessage = false;
    this.warningMessage = "";
    this.invitedUsername = "";
    this.groupUserList = [];
  }

  async tabChanged(tabChangeEvent: MatTabChangeEvent) {
    console.log(tabChangeEvent.tab.textLabel);
    if(tabChangeEvent.tab.textLabel == "Group Information") {
      let projectId = SelabGlobalStorage.getProjectID();
      this.getGroupMembersByProjectId(projectId);
    }
  }

  async inviteGroup() {
    let projectId = SelabGlobalStorage.getProjectID();
    let username = this.invitedUsername;
    this.authService.inviteToProjectGroup(projectId, username)
      .subscribe((response) => {
        console.log("invite group");
        console.log(response);
        alert(`invite user: ${username} success`);
        this.hasWarningMessage = false;
        this.invitedUsername = "";
      }, (error) => {
        this.hasWarningMessage = true;
        this.warningMessage = `User: ${username} Isn't Existed`;
      })
  }

  async getGroupMembersByProjectId(projectId: string) {
    this.authService.getGroupMembersByProjectId(projectId)
      .subscribe((response) => {
        this.groupUserList = JSON.parse(response.body);
      })
  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit() {
    let projectId = SelabGlobalStorage.getProjectID();
    this.getGroupMembersByProjectId(projectId);
  }
}
