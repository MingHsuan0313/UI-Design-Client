import {Component, Input, OnInit} from '@angular/core';

import {Storage} from '../../shared/storage';
import GraphEditorService from '../../services/externalRepresentation/graph-editor.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import ImportService from '../../services/internalRepresentation/import.service';
import ExportService from '../../services/internalRepresentation/export.service';
import { MatDialog } from '@angular/material';
import { ProjectNameDialogComponent } from './project-name-dialog/project-name-dialog.component';
import { SelabGlobalStorage } from 'src/app/models/store/globalStorage';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/store/app.state';
import { IRSetProjectNameAction } from 'src/app/models/store/actions/internalRepresentation.action';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.css']
})
export class DefaultLayoutComponent implements OnInit {

  constructor(public projectNameDialog: MatDialog,
    private store: Store<AppState>
    ) {

    const dialogRef = this.projectNameDialog.open(ProjectNameDialogComponent,{
      autoFocus: true,
      disableClose: true
    })
    
    dialogRef.afterClosed().subscribe(projectName => {
      console.log(`project name you choose is ${projectName}`);
      SelabGlobalStorage.setProjectName(projectName);
      this.store.dispatch(new IRSetProjectNameAction(projectName));
      // document.getElementById('tab-0').click();
    })
  }

  ngOnInit(): void {
  }
}