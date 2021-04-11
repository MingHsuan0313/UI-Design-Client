import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import axios from 'axios';
import { SelabGlobalStorage } from 'src/app/models/store/globalStorage';

@Component({
  selector: 'app-invite-group',
  templateUrl: './invite-group.component.html',
  styleUrls: ['./invite-group.component.css']
})
export class InviteGroupComponent implements OnInit {
  username: string;
  hasWarningMessage: boolean;
  warningMessage: string;

  constructor(
    private dialogRef: MatDialogRef<InviteGroupComponent>
  ) {
    this.hasWarningMessage = false;
    this.username = "";
    this.warningMessage = "";
  }

  async close() {
    if(this.username.length > 0) {
      let projectId = SelabGlobalStorage.getProjectID();
      let username = this.username;
      await axios.put('http://localhost:8083/selab/auth/group',{},{
        headers: {
          projectID: projectId,
          userName: username
        }
      }).then((response) => {
        if(response["data"] == "user is not found") {
          this.hasWarningMessage = true;
          this.warningMessage = `User: ${username} Isn't Existed`;
        }
        else {
          this.dialogRef.close(this.username);
        }
      })
    }
    else {
      this.hasWarningMessage = true;
      this.warningMessage = "User Name can't be empty";
    }
  }

  ngOnInit() {
  }

}
