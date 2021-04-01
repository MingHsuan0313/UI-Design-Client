import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/material';

@Component({
  selector: 'app-welcome-dialog',
  templateUrl: './welcome-dialog.component.html',
  styleUrls: ['./welcome-dialog.component.css']
})
export class WelcomeDialogComponent implements OnInit {

  constructor(
    public welcomeDialogRef: MatDialogRef<WelcomeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {


  }

  navigateToLoginPage() {
    this.welcomeDialogRef.close();
  }

  createNewProject() {
    this.welcomeDialogRef.close("Create New Project");
  }

  openExistingProject() {
    this.welcomeDialogRef.close("Open Existing Project");
  }

  ngOnInit() {
  }
}
