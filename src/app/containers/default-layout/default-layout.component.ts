import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProjectNameDialogComponent } from './project-name-dialog/project-name-dialog.component';
import { SelabGlobalStorage } from 'src/app/models/store/globalStorage';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/store/app.state';
import { IRSetProjectNameAction } from 'src/app/models/store/actions/internalRepresentation.action';
import { WelcomeDialogComponent } from 'src/app/components/welcome-dialog/welcome-dialog.component';
import { ImportProjectComponent } from 'src/app/components/welcomeDialog/import-project/import-project.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.css']
})
export class DefaultLayoutComponent implements OnInit {

  constructor(
    public projectNameDialog: MatDialog,
    public welcomeDialog: MatDialog,
    public importProjectDialog: MatDialog,
    private store: Store<AppState>
  ) {

    const welcomeDialogRef = this.welcomeDialog.open(WelcomeDialogComponent, {
      width: "25%",
      height: "30%",
      autoFocus: true,
      disableClose: true
    })

    welcomeDialogRef.afterClosed().subscribe(result => {
      if (result == "Create New Project") {
        const projectNameDialogRef = this.projectNameDialog.open(ProjectNameDialogComponent, {
          autoFocus: true,
          disableClose: true
        })

        projectNameDialogRef.afterClosed().subscribe(projectName => {
          SelabGlobalStorage.setProjectName(projectName);
          this.store.dispatch(new IRSetProjectNameAction(projectName));
        })
      }

      else if (result == "Open Existing Project") {
        this.importProjectDialog.open(ImportProjectComponent, {
          autoFocus: true,
          disableClose: true
        })
      }
    })
  }

  ngOnInit(): void {
  }
}