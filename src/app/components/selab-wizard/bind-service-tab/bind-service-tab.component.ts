import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CompositeComponent } from 'src/app/models/internalRepresentation/CompositeComponent.model';
import { ServiceMappingType } from 'src/app/models/service-component-dependency';
import { PipelineCreateOperationAction } from 'src/app/models/store/actions/pipelineTask.action';
import { AppState } from 'src/app/models/store/app.state';
import { Argument, Operation } from 'src/app/models/store/serviceEntry.model';
import { UIComponent } from 'src/app/models/ui-component-dependency';
import ServiceComponentService from 'src/app/services/serviceComponent/service-component.service';

@Component({
  selector: 'bind-service-tab',
  templateUrl: './bind-service-tab.component.html',
  styleUrls: ['./bind-service-tab.component.css']
})
export class BindServiceTabComponent implements OnInit {
  @Input() uiComponent: UIComponent;
  serviceOptions: any[];
  argumentOptions: any[];
  serviceComponentPool: Map<String,Boolean>; // check is serviceComponent has in pool
  selectedService;

  isQueryingService: boolean;
  isArgument: boolean;

  constructor(
    private store: Store<AppState>,
    private serviceComponentService: ServiceComponentService) {
    this.isQueryingService = false;
    this.argumentOptions = [];
    this.serviceComponentPool = new Map();
  }

  chooseService(event, option) {
    console.log("choose service");
    console.log(option);
    this.selectedService = option;
    (this.uiComponent.getServiceComponent() as Operation)
      .setClassName(option["className"])
      .setName(option["name"])
      .setServiceID(option["serviceID"])
    this.queryArguments();
  }

  update(uiComponent: UIComponent) {
    this.uiComponent = uiComponent;
  }

  chooseArgument(event, option, subComponent: UIComponent) {
    console.log("choose option");
    console.log(option);
    subComponent.getServiceComponent()
      .setName(option)
  }

  queryArguments() {
    this.serviceComponentService
      .queryArgumentsByServiceID(this.uiComponent.getServiceComponent().serviceID)
      .subscribe((response) => {
        // console.log(this.uiComponent.getServiceComponent().getServiceID())
        // console.log("get arguments");
        // console.log(response["body"]);
        let argumentOption;
        this.argumentOptions = [];
        let serviceArguments = JSON.parse(response["body"]);
        for (let index = 0; index < serviceArguments.length; index++) {
          // console.log(serviceArguments[index]);
          let argument = serviceArguments[index];

          if (argument["isComplexType"] == true) {
            for (let j = 0; j < argument["arguments"].length; j++) {
              let complexTypeArgument = argument["arguments"][j];
              argumentOption = new Argument()
                .setName(complexTypeArgument["name"])
                .setIsComplexType(complexTypeArgument["isComplexType"]);
              this.argumentOptions.push(argumentOption);
            }
          }
          else {
            if (argument["annotationType"].split(".").pop() != "CookieValue") {
              argumentOption = new Argument()
                .setName(argument["name"])
                .setIsComplexType(argument["isComplexType"])
              this.argumentOptions.push(argumentOption);
            }
          }
        }
        let serviceComponent = this.uiComponent.getServiceComponent();
        if(!this.serviceComponentPool.has(serviceComponent.name)) {
          this.serviceComponentPool[serviceComponent.name] = true;
          console.log('fuck you')
        }
        // serviceComponent has been in pool
        else
          return;

        let operation: Operation;
        if(serviceComponent.serviceID.toString().length > 0) {
          operation = new Operation()
            .setClassName(serviceComponent.className)
            .setName(serviceComponent.name)
            .setServiceID(serviceComponent.serviceID)
        }
        for(let index = 0;index < this.argumentOptions.length;index++)
          operation.addArgument(this.argumentOptions[index]);
        console.log("dispatc.........");
        this.store.dispatch(new PipelineCreateOperationAction(operation));
      },
        (err) => {
          console.log("error");
          console.log(err);
        })
  }

  queryService() {
    this.isQueryingService = true;
    console.log("query service");

    this.serviceComponentService
      // .queryServices(this.uiComponent,2)
      .queryMatchedServices(this.uiComponent)
      .subscribe(
        (response) => {
          this.serviceOptions = JSON.parse(response["body"]);
          for (let index = 0; index < this.serviceOptions.length; index++) {
            this.serviceOptions[index]["wsdlName"] = this.serviceOptions[index]["name"];
            this.serviceOptions[index]["name"] = this.serviceOptions[index]["name"]
              .split(".")[0]
              .split("-")[0]
            this.serviceOptions[index]["argc"] = this.serviceOptions[index]["name"]
              .split(".")[0]
              .split("-").length - 1
          }
          this.isQueryingService = false;
        },
        (err) => {
          console.log(err)
        }
      )
  }

  toggleIsArgument(event, subComponent: UIComponent) {
    if (event)
      subComponent.getServiceComponent().setBind(true);
    else
      subComponent.getServiceComponent().setBind(false);
  }

  ngOnInit() {
  }
}