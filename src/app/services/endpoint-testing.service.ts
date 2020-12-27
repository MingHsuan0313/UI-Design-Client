import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PipelineSetOperationLogAction } from '../models/store/actions/pipelineTask.action';
import { AppState } from '../models/store/app.state';
import { ServiceComponent } from '../models/store/serviceEntry.model';

@Injectable({
  providedIn: 'root'
})
export class EndpointTestingService {
  apiServerUrl: string;
  projectName: string;
  axios: any;
  sessionID: string;

  constructor(
    private store: Store<AppState>
  ) {
    this.apiServerUrl = "http://140.112.90.144:7122";
    this.projectName = "InventorySystemBackendMarksTonyModify";
    this.axios = require("axios");
    this.axios.defaults.adapter = require('axios/lib/adapters/http')
    this.axios.defaults.withCredentials = true
    this.sessionID = "";
  }

  async test(operation: ServiceComponent, requestParam: Object) {
    console.log(`test operation ${operation.name}`);
    // get sessionID
    await this.axios.get(`${this.apiServerUrl}/registerID`)
      .then((response) => {
        this.sessionID = response["data"]["sessionID"];
        console.log(`sessionID = ${this.sessionID}`);
      }, (error) => {
        console.log("register failed");
        console.log(error);
      })

    if (Object.keys(operation.argComplexTypeUrl).length == 0)
      await this.testServiceWithPrimitiveTypeArg(operation, requestParam);
    else
      await this.testServiceWithComplexTypeArg(operation, requestParam);
  }

  // five steps
  // 1: init service instance
  // 2: init complexType Args instance
  // 3: for loop call complexType Arg's setter
  // 4: invoke service
  // 5: serialize result
  async testServiceWithComplexTypeArg(operation: ServiceComponent, requestParam: Object) {
    let serviceID = operation.serviceID;
    let serviceInitUrl = `${this.apiServerUrl}/${this.projectName}/${operation.className.split(".").join("/")}/initMethod`; // from className
    let serviceInvokeUrl = `${this.apiServerUrl}/${this.projectName}/${operation.className.split(".").join("/")}/${operation.wsdlFilename.split(".")[0]}`; // from wsdlName
    console.log(`service Init Url = ${serviceInitUrl}\nservice Invoke Url = ${serviceInvokeUrl}`);
    let complexArgTable = operation.argComplexTypeUrl;
    let serviceParams = {};

    // this is random value for inventory system validation parameter
    serviceParams["validation"] = 4;
    for (const name in requestParam) {
      let value = requestParam[name];
      // complexType arg
      if (name.split("-").length > 1)
        continue
      else {
        serviceParams[name] = value;
      }
    }

    // init all complexType arg
    for (const complexArgName in complexArgTable) {
      let complexVarInitUrl = `${this.apiServerUrl}/${this.projectName}/${complexArgTable[complexArgName].initUrl}`;
      let complexVarInstanceSelf = "";

      // init
      console.log("init Department url: " + complexVarInitUrl)
      await this.axios(complexVarInitUrl, {
        headers: {
          sessionID: this.sessionID
        }
      }).then((response) => {
        let instanceID = response["data"]["serviceResult"]["id"];
        complexVarInstanceSelf = `{"id": "${instanceID}"}`;
        console.log(`init complexType var ${complexArgName} success self = ${complexVarInstanceSelf}`);
      })

      // setter all property
      for (let index = 0; index < complexArgTable[complexArgName].args.length; index++) {
        let argSetterUrl = `${this.apiServerUrl}/${this.projectName}/${complexArgTable[complexArgName].args[index].setterUrl}`;
        let argName = complexArgTable[complexArgName].args[index].name;
        if (argName == "id")
          continue;
        let paramkey = `${complexArgName}-${argName}`;
        let argValue = requestParam[paramkey];
        await this.axios.get(argSetterUrl, {
          headers: {
            sessionID: this.sessionID
          },
          params: {
            self: complexVarInstanceSelf,
            [argName]: argValue
          }
        }).then(async (response) => {
          console.log(`setter ${argName} success`);
          console.log(response["data"]);
        })
      }
      serviceParams[complexArgName] = complexVarInstanceSelf;
      console.log(`sessionID = ${this.sessionID}`);
    }

    await this.axios.get(serviceInitUrl, {
      headers: {
        sessionID: this.sessionID
      },
    }).then((response) => {
      let serviceInstanceID = response["data"]["serviceResult"]["id"];
      let serviceSelf = `{"id": "${serviceInstanceID}"}`;
      serviceParams["self"] = serviceSelf;
      console.log(`init service ${operation.name} success self = ${serviceSelf}`);
      console.log(serviceParams)
      console.log(serviceInvokeUrl);
      this.axios.get(serviceInvokeUrl, {
        headers: {
          sessionID: this.sessionID
        },
        params: serviceParams
      }).then((response) => {
        let statusCode = response["data"]["status_code"];
        console.log("invoke success");
        console.log(response["data"])
        if (statusCode == 200) {
          console.log(`Invoke ${operation.name} success status = ${response["data"]["status_code"]}`);
          let resultID = response["data"]["serviceResult"]["id"];
          let resultSelf = `{"id": "${resultID}"}`;

          // 3: gson serialize return data
          this.axios.get(`${this.apiServerUrl}/gson/serialize`, {
            headers: {
              sessionID: this.sessionID
            },
            params: {
              self: resultSelf
            }
          }).then((response) => {
            console.log(`serialized ${operation.name} return success`);
            console.log(response["data"]);
            this.store.dispatch(new PipelineSetOperationLogAction(serviceID, JSON.stringify(response["data"])));
          })
        }
        else {
          console.log(`status code = ${statusCode}`);
          console.log(response["data"]);
          this.store.dispatch(new PipelineSetOperationLogAction(serviceID, JSON.stringify(response["data"])));
        }
      })
    })
  }

  // three step
  // 1: init service instance
  // 2: invoke service
  // 3: serialize result
  async testServiceWithPrimitiveTypeArg(operation: ServiceComponent, requestParam: Object) {
    let serviceID = operation.serviceID;
    console.log("test primitive type");
    let serviceInitUrl = `${this.apiServerUrl}/${this.projectName}/${operation.className.split(".").join("/")}/initMethod`; // from className
    let serviceInvokeUrl = `${this.apiServerUrl}/${this.projectName}/${operation.className.split(".").join("/")}/${operation.wsdlFilename.split(".")[0]}`; // from wsdlName
    // console.log(`ServiceInit url = ${serviceInitUrl}\n`)
    // 1: init service
    await this.axios.get(serviceInitUrl, {
      headers: {
        sessionID: this.sessionID
      }
    }).then((response) => {
      console.log(response["data"]);
      let serviceInstanceID = response["data"]["serviceResult"]["id"];
      let serviceSelf = `{"id": "${serviceInstanceID}"}`;
      console.log(`${operation.name} init success, instanceID = ${serviceSelf}`);
      let serviceParams = requestParam;
      serviceParams["self"] = serviceSelf;

      // 2: invoke service
      this.axios.get(serviceInvokeUrl, {
        headers: {
          sessionID: this.sessionID
        },
        params: serviceParams
      }).then((response) => {
        console.log(response["data"]);
        let statusCode = response["data"]["status_code"];
        if (statusCode == 200) {
          console.log(`Invoke ${operation.name} success status = ${response["data"]["status_code"]}`);
          if (response["data"]["serviceResult"] == undefined)
            return;
          let resultID = response["data"]["serviceResult"]["id"];
          let resultSelf = `{"id": "${resultID}"}`;

          // 3: gson serialize return data
          this.axios.get(`${this.apiServerUrl}/gson/serialize`, {
            headers: {
              sessionID: this.sessionID
            },
            params: {
              self: resultSelf
            }
          }).then((response) => {
            console.log(`serialized ${operation.name} return success`);
            console.log(response["data"]);
            this.store.dispatch(new PipelineSetOperationLogAction(serviceID, JSON.stringify(response["data"])));
          })
        }
        else {
          console.log(`status code = ${statusCode}`);
          console.log(response["data"]);
          this.store.dispatch(new PipelineSetOperationLogAction(serviceID, JSON.stringify(response["data"])));
        }
      })
    })
  }
}