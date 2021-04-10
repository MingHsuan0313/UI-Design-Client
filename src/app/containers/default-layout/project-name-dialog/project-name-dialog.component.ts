import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DefaultLayoutComponent } from '../default-layout.component';
import axios from 'axios';
import { SelabGlobalStorage } from 'src/app/models/store/globalStorage';

@Component({
  selector: 'app-project-name-dialog',
  templateUrl: './project-name-dialog.component.html',
  styleUrls: ['./project-name-dialog.component.css']
})
export class ProjectNameDialogComponent implements OnInit {
  projectName: string;
  isProjectNameEmpty: boolean;

  constructor(
    public dialogRef: MatDialogRef<DefaultLayoutComponent>,
  ) {
    this.isProjectNameEmpty = false;
    this.projectName = "";

  }

  async close() {
    if (this.projectName.length > 0) {
      let userInfoObject = SelabGlobalStorage.sessionInformation['user'];
      console.log(SelabGlobalStorage.sessionInformation)
      let userId = userInfoObject['userID'];
      let groupId = userInfoObject['groupID'];
      await axios.post('http://localhost:8083/selab/project/create',{}, {
        headers: {
          groupID: groupId,
          userID: userId,
          projectName: this.projectName
        }
      }).then((response) => {
        if (response["data"] == 'project name has been used') {
          alert(response["data"]);
        }
        else {
          SelabGlobalStorage.sessionInformation["user"]["projectName"] = this.projectName;
          this.dialogRef.close(this.projectName);
        }
      })
    }
    else
      this.isProjectNameEmpty = true;
  }

  ngOnInit() {
  }
}