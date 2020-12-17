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
    private snackBar: MatSnackBar) {
    this.servicePool = store.select(operationPoolSelector());
  }

  openSnackBar(message: string, action: string) {

    this.snackBar.open(message, action, {
      verticalPosition: this.verticalPosition,
      duration: 2000,
    })
  }


  ngOnInit() {
    // let servicePoolObservable = this.store.select(operationPoolSelector());
    // servicePoolObservable.subscribe((servicePool) => {
    //   console.log(servicePool)
    // })
    // this.servicePool= this.generateFakeData();
    // console.log(this.servicePool)
  }

  test(operation: Operation) {
    let axios = require("axios");
    axios.defaults.adapter = require('axios/lib/adapters/http')
    axios.defaults.withCredentials = true

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
    

    // first Register get sessionID
    // second Init Class
    // third Invoke Service
    let apiServerUrl = "http://140.112.90.144:7122"

    axios.get(`${apiServerUrl}/registerID`, {
    })
      .then((response) => {
        let sessionID = response["data"]["sessionID"];
        let projectName = "InventorySystemBackendMarksTonyModify";
        console.log(`register success, sessionID = ${sessionID}`);
        console.log(operation);

        let initUrl = `${apiServerUrl}/${projectName}/${operation.className.split(".").join("/")}/initMethod`; // from className
        let serviceUrl = `${apiServerUrl}/${projectName}/${operation.className.split(".").join("/")}/${operation.wsdlName.split(".")[0]}`; // from wsdlName
        console.log(`initUrl = ${initUrl}\nserviceUrl = ${serviceUrl}`);

        axios.get(initUrl, {
          headers: {
            sessionID: sessionID
          } 
        }).then(async (response) => {
            let instanceID = response["data"]["serviceResult"]["id"];
            let self = `{"id": "${instanceID}"}`;
            console.log(`login init success, instanceID = ${self}`);
            let newParam = params;
            newParam["self"] = self;
            axios.get(serviceUrl, {
              headers: {
                sessionID: sessionID
              },
              params: newParam
            }).then(async (response) => {
              console.log("login success");
              console.log(response["data"])
              let resultID = response["data"]["serviceResult"]["id"];
              self = `{"id": "${resultID}"}`;
              axios.get("http://140.112.90.144:7122/gson/serialize", {
                headers: {
                  sessionID: sessionID
                },
                params: {
                  self: self
                }
              }).then((response) => {
                console.log("serialized data success");
                console.log(response["data"]);
              })
            })
        })
      }, (error) => {
        console.log("error");
      })
    console.log(params)
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