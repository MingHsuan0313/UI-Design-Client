import { Injectable } from '@angular/core';
import { Operation } from '../models/store/serviceEntry.model';

@Injectable({
  providedIn: 'root'
})
export class EndpointTestingService {
  apiServerUrl: string;
  projectName: string;
  axios: any;
  sessionID: string;

  constructor() {
    this.apiServerUrl = "http://140.112.90.144:7122";
    this.projectName = "InventorySystemBackendMarksTonyModify";
    this.axios = require("axios");
    axios.defaults.adapter = require('axios/lib/adapters/http')
    axios.defaults.withCredentials = true
  }

  async test(operation: Operation, requestParam: Object) {
    // get sessionID
    await axios.get(`${this.apiServerUrl}/registerID`)
      .then((response) => {
        this.sessionID = response["data"]["sessionID"];
      }, (error) => {
        console.log("register failed");
        console.log(error);
      })

    if (Object.keys(operation.complexTypeUrl).length == 0)
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
  async testServiceWithComplexTypeArg(operation: Operation, requestParam: Object) {

  }

  // three step
  // 1: init service instance
  // 2: invoke service
  // 3: serialize result
  async testServiceWithPrimitiveTypeArg(operation: Operation, requestParam: Object) {
    let serviceInitUrl = `${this.apiServerUrl}/${this.projectName}/${operation.className.split(".").join("/")}/initMethod`; // from className
    let serviceInvokeUrl = `${this.apiServerUrl}/${this.projectName}/${operation.className.split(".").join("/")}/${operation.wsdlName.split(".")[0]}`; // from wsdlName
    // console.log(`ServiceInit url = ${serviceInitUrl}\n`)
    // 1: init service
    await axios.get(serviceInitUrl, {
      headers: {
        sessionID: sessionID
      }
    }).then((response) => {
      let serviceInstanceID = response["data"]["serviceResult"]["id"];
      let serviceSelf = `{"id": "${serviceInstanceID}"}`;
      console.log(`${operation.name} init success, instanceID = ${serviceSelf}`);
      let serviceParams = requestParam;
      serviceParams["self"] = serviceSelf;

      // 2: invoke service
      axios.get(serviceInvokeUrl, {
        headers: {
          sessionID: sessionID
        },
        params: serviceParams
      }).then((response) => {
        console.log(`Invoke ${operation.name} success status = ${response["data"]["status"]}`);
        let resultID = response["data"]["serviceResult"]["id"];
        let resultSelf = `{"id": "${resultID}"}`;

        // 3: gson serialize return data
        axios.get(`${this.apiServerUrl}/gson/serialize`, {
          headers: {
            sessionID: sessionID
          },
          params: {
            self: resultSelf
          }
        }).then((response) => {
          console.log(`serialized ${operation.name} return success`);
          console.log(response["data"]);
        })
      })
    })
  }
}
