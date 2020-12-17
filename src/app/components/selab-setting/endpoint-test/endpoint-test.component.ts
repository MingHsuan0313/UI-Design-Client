import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition
} from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/models/store/app.state';
import { operationPoolSelector, tasksSelector } from 'src/app/models/store/reducers/PipelineStorageSelector';
import { Argument, Operation } from 'src/app/models/store/serviceEntry.model';
import { EndpointTestingService } from 'src/app/services/endpoint-testing.service';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-endpoint-test',
  templateUrl: './endpoint-test.component.html',
  styleUrls: ['./endpoint-test.component.css']
})
export class EndpointTestComponent implements OnInit {
  servicePool: Observable<Operation[]>;
  verticalPosition: MatSnackBarVerticalPosition = "top";
  constructor(
    private store: Store<AppState>,
    private httpClientService: HttpClientService,
    private snackBar: MatSnackBar,
    private endpointTestingService: EndpointTestingService) {
    this.servicePool = store.select(operationPoolSelector());
  }

  openSnackBar(message: string, action: string) {

    this.snackBar.open(message, action, {
      verticalPosition: this.verticalPosition,
      duration: 2000,
    })
  }


  ngOnInit() {
  }

  test(operation: Operation) {
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
    this.endpointTestingService.test(operation,params);
  }

  generateFakeData() {

    let operations = [];
    let argument1 = new Argument()
      .setName("account")
    let argument2 = new Argument()
      .setName("password")
    let operation1 = new Operation()
      .setName("login")
      .setServiceID("1")
      .addArgument(argument1)
      .addArgument(argument2)
      .setMethod("get")
      .setUrl("/login")

    let argument3 = new Argument()
      .setName("number1")
    let argument4 = new Argument()
      .setName("number2")
    let operation2 = new Operation()
      .setName("add")
      .setServiceID("2")
      .addArgument(argument3)
      .addArgument(argument4)
      .setMethod("get")
      .setUrl("/add")

    let argument5 = new Argument()
      .setName("number1")
    let argument6 = new Argument()
      .setName("number2")
    let operation3 = new Operation()
      .setName("sub")
      .setServiceID("3")
      .addArgument(argument5)
      .addArgument(argument6)
      .setMethod("get")
      .setUrl("/sub");


    operations.push(operation2);
    operations.push(operation1);
    operations.push(operation3);
    return operations;
  }


  getkeys(map) {
    return Object.keys(map);
  }
}