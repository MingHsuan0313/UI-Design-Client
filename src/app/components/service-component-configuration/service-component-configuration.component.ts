import { Component, OnInit } from '@angular/core';
import { UIComponent, FormComposite } from 'src/app/models/ui-component-dependency';
import { ServiceComponentModel ,ServiceMappingType } from "../../models/service-component-dependency";
import { Library } from "../../shared/library";
import { GraphStorage , VertexStorage , StyleStorage } from "../../models/graph-dependency";
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
  selectedServiceComponent: ServiceComponentModel;

  selectedServiceComponentName: String;
  selectedArgumentName: String;

  uiType: String; // service or argument or none

  serviceComponentOptions: String[];
  argumentOptions: String[];

  isMatchmaking: boolean;
  graphStorage: GraphStorage;
  constructor(private graphEditorService: GraphEditorService,
    private serviceComponentService: ServiceComponentService) {
    this.isMatchmaking = false;
    this.selectedServiceComponentName = "select service";
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
    console.log("select service " + this.selectedServiceComponentName);
    this.serviceComponentService.setSelectedServiceComponent(this.selectedServiceComponentName);
    this.selectedUIComponent.serviceComponent.name = this.selectedServiceComponentName;
    this.selectedUIComponent.serviceComponent.serviceType = ServiceMappingType['service'];
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
    let uiCategory = this.selectedUIComponent.category;
    let type = this.selectedUIComponent.type;
    let parameters = 0;
    if (uiCategory == "input") {
      if (type == "form") {
        parameters = this.countArguments();
        this.serviceComponentService.queryServices(uiCategory, parameters, this.isMatchmaking).subscribe(
          response => {
            let serviceComponents = response['body'];
            serviceComponents = JSON.parse(serviceComponents);
            console.log("return from server");
            console.log(serviceComponents);
            this.serviceComponentOptions = [];
            this.serviceComponentService.setServiceComponents(serviceComponents);
            for (let index = 0; index < serviceComponents.length; index++) {
              this.serviceComponentOptions.push(serviceComponents[index]["name"]);
            }
          }
        )
      }
      else if (type == "input") {
        console.log("can be argument");
        return;
      }
      else {
        console.log("can be service component");
        return;
      }
    }
    else if (uiCategory == "informative") {
      this.serviceComponentService.queryOutputServices(this.isMatchmaking).subscribe(
        response => {
          let serviceComponents = response['body'];
          serviceComponents = JSON.parse(serviceComponents);
          this.serviceComponentOptions = [];
          this.serviceComponentService.setServiceComponents(serviceComponents);
          for (let index = 0; index < serviceComponents.length; index++) {
            this.serviceComponentOptions.push(serviceComponents[index]["name"]);
          }
        }
      )
    }
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

  queryOutputService() {

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
          this.selectedServiceComponentName = this.selectedUIComponent.serviceComponent.name;
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
          console.log(parentServiceName);
          let parentServiceID = this.serviceComponentService.findServiceIDByName(parentServiceName);
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
