import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatSnackBar,
  MatSnackBarVerticalPosition
} from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/models/store/app.state';
import { operationPoolSelector, tasksSelector } from 'src/app/models/store/selectors/PipelineStorageSelector';
import { ArgumentModel, ServiceComponentModel } from 'src/app/models/service-component-dependency';
import { EndpointTestingService } from 'src/app/services/endpoint-testing.service';
import { HttpClientService } from 'src/app/services/http-client.service';
import ServiceComponentService from 'src/app/services/serviceComponent/service-component.service';
import { CodeEditorDialogComponent } from '../../code-editor-dialog/code-editor-dialog.component';
import { CodeEditorComponent } from '../../code-editor/code-editor.component';
import { JestTestingLogWindowComponent } from './jest-testing-log-window/jest-testing-log-window.component';
import { TestingLogWindowComponent } from './testing-log-window/testing-log-window.component';

@Component({
  selector: 'app-endpoint-test',
  templateUrl: './endpoint-test.component.html',
  styleUrls: ['./endpoint-test.component.css']
})
export class EndpointTestComponent implements OnInit {
  servicePool: ServiceComponentModel[];
  verticalPosition: MatSnackBarVerticalPosition = "top";
  isWaitingTesting: boolean = false;
  constructor(
    private store: Store<AppState>,
    private httpClientService: HttpClientService,
    private snackBar: MatSnackBar,
    private endpointTestingService: EndpointTestingService,
    public logWindow: MatDialog, // return from invoke individual service component
    private serivceComponentService: ServiceComponentService,
    public codeEditor: MatDialog,
    // return from Jest Server
    public jestLogWindow: MatDialog) {
    this.servicePool = [];
    store.select(operationPoolSelector())
      .subscribe((serviceComponentPool) => {
        console.log("update service pool");
        this.servicePool = [];
        let keys = Object.keys(serviceComponentPool);
        for (let index = 0; index < keys.length; index++) {
          let key = keys[index];
          this.servicePool.push(serviceComponentPool[key]);
        }
      })
  }

  openSnackBar(message: string, action: string) {

    this.snackBar.open(message, action, {
      verticalPosition: this.verticalPosition,
      duration: 2000,
    })
  }

  showCode(serviceComponent) {
    this.serivceComponentService.setSelectedServiceComponent(serviceComponent);
    let serviceID = serviceComponent.serviceID;
    let dialogRef;
    this.serivceComponentService.queryCodeByServiceID(serviceID)
      .subscribe((response) => {
        let code = response["body"];
        dialogRef = this.codeEditor.open(CodeEditorComponent, {
          width: '850px',
          height: '550px',
          panelClass: 'code-editor-dialog',
          data: {
            code: code,
            className: serviceComponent.className,
          }
        })
      });
  }

  launchLogWindow(log: string) {
    this.logWindow.open(TestingLogWindowComponent, {
      data: {
        log: log
      },
      disableClose: true,
      autoFocus: true
    })
  }

  servicePoolkeys() {
    return Object.keys(this.servicePool);
  }


  ngOnInit() {
  }

  test(operation: ServiceComponentModel) {
    this.openSnackBar(`Test Service: ${operation.name}`, 'test');
    let argumentss = operation.arguments as any;
    let requestBody = {};
    let params = {};
    for (let index = 0; index < operation.arguments.length; index++) {
      let id = `${operation.name}-${argumentss[index].name}`;
      let element = (document.getElementById(id) as HTMLInputElement);
      let value = element.value;
      params[argumentss[index].name] = value;
      requestBody[argumentss[index].name] = value;
    }
    let log = this.endpointTestingService.test(operation, params);
  }

  showLog(operation: ServiceComponentModel) {
    console.log("show log");
    console.log(operation);
    this.launchLogWindow(operation.log);
  }

  testAll() {
    // console.log(JSON.stringify(this.servicePool));
    let axios = require('axios');
    this.isWaitingTesting = true;
    axios.post('http://localhost:8081/selab/testing/testingServiceComponentPool', {
      header: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify(this.servicePool)
    }).then((response) => {
      this.isWaitingTesting = false;
      // console.log(response["data"]);
      let log: string = response["data"];
      this.jestLogWindow.open(JestTestingLogWindowComponent, {
        data: {
          log: log
        },
        disableClose: true,
        autoFocus: true
      })
    }, (error) => {
      this.isWaitingTesting = false;
    })
  }

  getkeys(map) {
    return Object.keys(map);
  }
}