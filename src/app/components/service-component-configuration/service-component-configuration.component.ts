import { Component, OnInit } from '@angular/core';
import { UIComponent, FormComponent } from 'src/app/models/ui-component-dependency';
import { ServiceComponentModel, ServiceMappingType } from "../../models/service-component-dependency";
import { Library } from "../../shared/library";
import { GraphStorage, VertexStorage, StyleStorage } from "../../models/graph-dependency";
import GraphEditorService from 'src/app/services/externalRepresentation/graph-editor.service';
import ServiceComponentService from 'src/app/services/serviceComponent/service-component.service';
import { LayoutComponent } from 'src/app/models/internalRepresentation/LayoutComponent.model';
import { BasicComponent } from 'src/app/models/internalRepresentation/BasicComponent.model';


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
  selectedArgumentName: string;
  selectedArgumentType: string;

  uiType: string; // service or argument or none

  serviceComponentOptions: any[];
  argumentOptions: string[];
  argumentTypeOptions: string[];


  isQuerying: boolean;
  graphStorage: GraphStorage;
  constructor(private graphEditorService: GraphEditorService,
    private serviceComponentService: ServiceComponentService) {
    this.isQuerying = false;
    this.selectedArgumentName = "select argument";
    this.selectedArgumentType = "select argument type";
    this.serviceComponentOptions = [];
    this.argumentOptions = [];
    this.argumentTypeOptions = ["String", "int", "double", "boolean"]

    // for (let se of this.serviceComponentOptions)
    //   console.log(se)
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

  selectArgumentType() {
    console.log("select type" + this.selectedArgumentType);
    this.selectedUIComponent.serviceComponent.argumentType = this.selectedArgumentType;
    this.selectedUIComponent.serviceComponent.serviceType = ServiceMappingType['argument'];
  }

  countArguments() {
    let result = 0;
    for (let component of (this.selectedUIComponent as FormComponent).componentList) {
      if (component.category == "input")
        result += 1;
    }

    return result;
  }

  queryServices() {
    this.isQuerying = true;
    let parameterCount = 0;
    parameterCount = this.countArguments();
    this.serviceComponentService.queryMatchedServices(this.selectedUIComponent, parameterCount).subscribe(
      response => {
        this.isQuerying = false;
        // let serviceComponentsJson = response;
        // let serviceComponentsList: ServiceComponentModel[]= [];
        let serviceComponentList = JSON.parse(response["body"]);
        this.serviceComponentOptions = []

        for (let index = 0; index < serviceComponentList.length; index++) {
          let serviceComponentModel = new ServiceComponentModel();
          serviceComponentModel.setName(serviceComponentList[index]["name"]);
          serviceComponentModel.setClassName(serviceComponentList[index]["className"]);
          serviceComponentModel.setServiceID(serviceComponentList[index]["serviceID"]);
          serviceComponentModel.setPreference(serviceComponentList[index]["similarity"])
          this.serviceComponentOptions.push(serviceComponentModel);
        }

        this.serviceComponentService.setServiceComponents(serviceComponentList);
      }
    )
  }

  queryArgumentsByServiceID(serviceID) {
    this.serviceComponentService.queryArgumentsByServiceID(serviceID).subscribe(
      response => {
        let argumentList = response['body'];
        argumentList = JSON.parse(argumentList);
        this.argumentOptions = [];
        for (let index = 0; index < argumentList.length; index++) {
          this.argumentOptions.push(argumentList[index]);
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

      if (!(this.selectedVertexStorage.component instanceof LayoutComponent)) {
        this.selectedUIComponent = this.selectedVertexStorage.component;
        this.selectedUIComponent = this.selectedVertexStorage.component;
        this.selectedServiceComponent = this.selectedUIComponent.serviceComponent;
        this.setUiTypeByComponent();
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
            // console.log(selectedVertex);
            let parentVertex = selectedVertex.parent;
            let parentVertexStorage = this.graphStorage.findVertexStorageByID(parentVertex["id"]);
            let parentServiceName = parentVertexStorage.component.serviceComponent.name;
            let parentServiceID = parentVertexStorage.component.serviceComponent.serviceID;
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
      } else {
        console.log("click layout component");
      }
    })

    graph.addListener(mxEvent.DOUBLE_CLICK, (sender, event) => {
      document.getElementById("OpenCodeEditor").click()
    })
  }
}
