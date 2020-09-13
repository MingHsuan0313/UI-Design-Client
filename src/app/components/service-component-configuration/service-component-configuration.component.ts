import { Component, OnInit } from '@angular/core';
import { GraphStorage } from 'src/app/models/graph-storage.model';
import { UIComponent, ServiceComponentModel, FormComposite } from 'src/app/models/model';
import { Library } from "../../shared/library";
import VertexStorage from 'src/app/models/vertex-storage.model';
import GraphEditorService from 'src/app/services/graph-editor.service';
import ServiceComponentService from 'src/app/services/service-component.service';

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

  serviceComponentOptions: any[];
  argumentOptions: any[];

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
  }

  selectArgument() {
    console.log("select argument " + this.selectedArgumentName);
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
      }
      else if (type == "input") {
        console.log("can be argument");
      }
      else {
        console.log("can be service component");
        return;
      }
    }
    else if (uiCategory == "informative") {

    }

    this.serviceComponentService.queryServices(uiCategory, parameters, this.isMatchmaking).subscribe(
      response => {
        let serviceComponents = response['body'];
        serviceComponents = JSON.parse(serviceComponents);
        console.log("return from server");
        console.log(serviceComponents);
        this.serviceComponentOptions = [];
        this.serviceComponentService.setServiceComponents(serviceComponents);
        for(let index = 0;index < serviceComponents.length;index++) {
          this.serviceComponentOptions.push(serviceComponents[index]["name"]) ;
        }
      }
    )
  }

  initializeState() {
    this.argumentOptions = [];
    this.serviceComponentOptions = [];
  }

  ngOnInit() {
    this.graphStorage = this.graphEditorService.getGraphStorage();
    let graph = this.graphStorage.getGraph();
    graph.addListener(mxEvent.CLICK, (sender, event) => {
      // this.initializeState();
      let selectedVertex = sender.selectionModel.cells[0];
      this.selectedVertexStorage = this.graphStorage.findVertexStorageByID(selectedVertex["id"]);
      this.selectedUIComponent = this.selectedVertexStorage.component;
      this.selectedServiceComponent = this.selectedUIComponent.serviceComponent;
      this.setUiTypeByComponent();

      // console.log(this.selectedVertexStorage);
      // console.log(this.selectedUIComponent);
      // console.log("selected from service compoent")
    })

    graph.addListener(mxEvent.DOUBLE_CLICK, (sender, event) => {
      document.getElementById("OpenCodeEditor").click()
    })
  }
}
