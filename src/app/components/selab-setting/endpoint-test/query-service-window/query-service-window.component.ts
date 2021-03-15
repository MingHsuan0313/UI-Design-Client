import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import axios from 'axios';
import { ArgumentModel, ServiceComponentModel } from 'src/app/models/service-component-dependency';
import { PipelineCreateOperationAction } from 'src/app/models/store/actions/pipelineTask.action';
import { AppState } from 'src/app/models/store/app.state';

@Component({
  selector: 'app-query-service-window',
  templateUrl: './query-service-window.component.html',
  styleUrls: ['./query-service-window.component.css']
})
export class QueryServiceWindowComponent implements OnInit {
  serviceName: string;
  operationName: string;
  arguments: OperationArgument[];

  isQueryingService: boolean;
  serviceOptions: any[];

  constructor(  
    private store: Store<AppState>
  ) {
    this.serviceName = "";
    this.operationName = "";
    this.arguments = [];
    this.isQueryingService = false;
  }

  indexTracker(index: number, value: any) {
    return index;
  }

  addArgument() {
    let argument = new OperationArgument();
    this.arguments.push(argument);
  }

  removeArgument(index: number) {
    this.arguments.splice(index, 1);
  }

  valueChange(event, index) {
    // console.log('value change');
    // console.log(event);
    // console.log(index);
    this.arguments[index].setArgumentName(event.target.value);
  }

  typeChange(event, index) {
    // console.log('type change');
    // console.log(event);
    // console.log(index);
    this.arguments[index].setType(event.value);
  }

  queryService() {
    console.log("query service");
    console.log(this.arguments);
    console.log(this.operationName);
    this.isQueryingService = true;
    let requestBody = {
      "serviceName": `${this.operationName}Service`,
      "operationName": this.operationName,
      "arguments": this.arguments
    }
    console.log(requestBody);
    axios.post("http://140.112.90.144:8082/getMatchingServices", requestBody, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      console.log(response);
      console.log(response["data"]);
      this.serviceOptions = response["data"];
      console.log(this.serviceOptions);
      for (let index = 0; index < this.serviceOptions.length; index++) {
        this.serviceOptions[index]["argc"] = this.serviceOptions[index]["WSDLName"]
          .split(".")[0]
          .split("-").length - 1
      }
      this.isQueryingService = false;
    }, (error) => {
      alert("query failed, timeout");
      this.isQueryingService = false;
    })
  }

  queryArguments(serviceComponent: ServiceComponentModel) {
    let serviceArgument;
    let serviceID = serviceComponent.serviceID;
    axios.get('http://140.112.90.144:8082/getArguments',{
      params: {
        serviceID: serviceID
      }
    }).then((response) => {
      let args = response['data'];
      for(let index = 0;index < args.length;index++) {
        let argument = args[index];

        if(argument['isComplexType'] == true) {
          for(let j = 0;j < argument['arguments'].length;j++) {
            let complexTypeArgument = argument['arguments'][j];
            serviceArgument = new ArgumentModel()
              .setName(complexTypeArgument['name'])
              .setConstraint(complexTypeArgument['constraint'])
              .setIsComplexType(complexTypeArgument['isComplexType']);
            serviceComponent.addArgument(serviceArgument);
          }
        }
        else {
          if(argument['annotationType'].split('.').pop() != "CookieValue") {
            serviceArgument = new ArgumentModel()
              .setName(argument['name'])
              .setConstraint(argument['constraint'])
              .setIsComplexType(argument['isComplexType'])
            serviceComponent.addArgument(serviceArgument);
          }
        }
      }
      this.store.dispatch(new PipelineCreateOperationAction(serviceComponent));
    },(error) => {
      console.log(error);
    })
  }

  chooseService(event, option) {
    let serviceComponent = new ServiceComponentModel()
      .setClassName(option['className'])
      .setName(option['name'])
      .setServiceID(option['serviceID'])
      .setHttpMethod('get')
      .setWSDLName(option['WSDLName'])
      .setUrl();
    this.queryArguments(serviceComponent);
  }

  ngOnInit() {
  }

}

class OperationArgument {
  argumentName: string;
  type: string;
  isInput: string;

  constructor() {
    this.argumentName = "";
    this.type = "";
    this.isInput = "true";
  }

  setArgumentName(name: string): OperationArgument {
    this.argumentName = name;
    return this;
  }

  setType(type: string): OperationArgument {
    this.type = type;
    return this;
  }
}