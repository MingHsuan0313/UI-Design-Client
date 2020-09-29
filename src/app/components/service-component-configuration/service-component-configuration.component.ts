import { Component, OnInit } from '@angular/core';
import { UIComponent, FormComposite } from 'src/app/models/ui-component-dependency';
import { ServiceComponentModel, ServiceMappingType } from "../../models/service-component-dependency";
import { Library } from "../../shared/library";
import { GraphStorage, VertexStorage, StyleStorage } from "../../models/graph-dependency";
import GraphEditorService from 'src/app/services/externalRepresentation/graph-editor.service';
import ServiceComponentService from 'src/app/services/serviceComponent/service-component.service';

 
@Component({
  selector: 'app-service-component-configuration',
  templateUrl: './service-component-configuration.component.html',
  styleUrls: ['./service-component-configuration.component.css']
})
export class ServiceComponentConfigurationComponent implements OnInit {
  selectedUIComponent: UIComponent;
  selectedVertexStorage: VertexStorage;

  // for angular material option
  selectedServiceComponent: ServiceComponentModel;
  selectedArgumentName: String;

  uiType: String; // service or argument or none

  serviceComponentOptions: any[];
  argumentOptions: String[];

  isMatchmaking: boolean;
  graphStorage: GraphStorage;
  constructor(private graphEditorService: GraphEditorService,
    private serviceComponentService: ServiceComponentService) {
    this.isMatchmaking = false;
    this.selectedArgumentName = "select argument";
    this.serviceComponentOptions = [];
    this.argumentOptions = [];
    for (let se of this.serviceComponentOptions)
      console.log(se)
  }

  setUiTypeByComponent() {
    let uiComponentType = this.selectedUIComponent.type.toString();
    if (uiComponentType in Library.UI_Service_Type) {
      this.uiType = Library.UI_Service_Type[uiComponentType];
    }
    else
      this.uiType = "none";
  }

  selectService() {
    this.serviceComponentService.setSelectedServiceComponent(this.selectedServiceComponent);
    this.selectedUIComponent.serviceComponent = this.selectedServiceComponent;
  }

  selectArgument() {
    console.log("select argument " + this.selectedArgumentName);
    this.selectedUIComponent.serviceComponent.name = this.selectedArgumentName;
    this.selectedUIComponent.serviceComponent.serviceType = ServiceMappingType['argument'];
  }

  countArguments() {
    let result = 0;
    for (let component of (this.selectedUIComponent as FormComposite).componentList) {
      if (component.category == "input")
        result += 1;
    }

    return result;
  }

  queryServices() {
    let parameterCount = 0;
    // parameterCount = this.countArguments();
    this.serviceComponentService.queryServices(this.selectedUIComponent, parameterCount).subscribe(
      response => {
        console.log(response)
        console.log(response[0])
        let serviceComponentsJson = response;
        let serviceComponentsList: ServiceComponentModel[]= [];
        console.log("return from server");
        console.log(serviceComponentsJson);
        this.serviceComponentOptions = []

        for (let [key, value] of Object.entries(serviceComponentsJson)) {
          let temp = serviceComponentsJson[key].split(",");
          console.log(temp)
          let serviceComponent = new ServiceComponentModel();
          serviceComponent.setName(temp[0]);
          serviceComponent.setPreference(temp[1]);
          this.serviceComponentOptions.push(serviceComponent);
          serviceComponentsList.push(serviceComponent);
        }
        this.serviceComponentService.setServiceComponents(serviceComponentsList);
        console.log("push service")
        console.log(this.serviceComponentOptions);
      }
    )
  }

  queryArgumentsByServiceID(serviceID) {
    this.serviceComponentService.queryArgumentsByServiceID(serviceID).subscribe(
      response => {
        let argumentList = response['body'];
        argumentList = JSON.parse(argumentList);
        console.log("get argument List")
        console.log(argumentList);
        this.argumentOptions = [];
        for (let index = 0; index < argumentList.length; index++) {
          this.argumentOptions.push(argumentList[index]["name"]);
        }
      }
    )
  }

  initializeState() {
    // this.argumentOptions = [];
    // this.serviceComponentOptions = [];
  }

  ngOnInit() {
    this.graphStorage = this.graphEditorService.getGraphStorage();
    let graph = this.graphStorage.getGraph();
    graph.addListener(mxEvent.CLICK, (sender, event) => {
      let selectedVertex = sender.selectionModel.cells[0];
      this.selectedVertexStorage = this.graphStorage.findVertexStorageByID(selectedVertex["id"]);
      this.selectedUIComponent = this.selectedVertexStorage.component;
      this.selectedServiceComponent = this.selectedUIComponent.serviceComponent;
      this.setUiTypeByComponent();
      console.log("select ui component")
      console.log(this.selectedUIComponent)
      if (this.selectedUIComponent.serviceComponent.name.length == 0)
        this.initializeState();
      else {
        if (this.selectedUIComponent.serviceComponent.serviceType == ServiceMappingType['service']) {
          this.selectedServiceComponent = this.selectedUIComponent.serviceComponent;
        }
        else if (this.selectedUIComponent.serviceComponent.serviceType == ServiceMappingType['argument']) {
          this.selectedArgumentName = this.selectedUIComponent.serviceComponent.name;
        }
      }

      if (this.selectedUIComponent.category == "input") {
        if (this.selectedUIComponent.type == "form") {

        }
        else if (this.selectedUIComponent.type == "input") {
          console.log("parrent")
          // console.log(selectedVertex);
          let parentVertex = selectedVertex.parent;
          let parentVertexStorage = this.graphStorage.findVertexStorageByID(parentVertex["id"]);
          let parentServiceName = parentVertexStorage.component.serviceComponent.name;
          let parentServiceID = parentVertexStorage.component.serviceComponent.serviceID;
          console.log(parentServiceName);
          this.queryArgumentsByServiceID(parentServiceID);
        }
      }
      else if (this.selectedUIComponent.category == "informative") {
        if (this.selectedUIComponent.type == "table") {

        }
      }
      else if (this.selectedUIComponent.category == "navigation") {

      }
      else if (this.selectedUIComponent.category == "container") {

      }
      else if (this.selectedUIComponent.category == "layout") {

      }
    })

    graph.addListener(mxEvent.DOUBLE_CLICK, (sender, event) => {
      document.getElementById("OpenCodeEditor").click()
    })
  }
}
