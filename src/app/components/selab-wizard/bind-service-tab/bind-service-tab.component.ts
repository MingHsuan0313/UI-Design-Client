import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CompositeComponent } from 'src/app/models/internalRepresentation/CompositeComponent.model';
import { ServiceMappingType } from 'src/app/models/service-component-dependency';
import { PipelineCreateOperationAction } from 'src/app/models/store/actions/pipelineTask.action';
import { AppState } from 'src/app/models/store/app.state';
import { Argument, IServiceEntry, Operation } from 'src/app/models/store/serviceEntry.model';
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
      .setHttpMethod(option["httpMethod"])
      .setWSDLName(option["WSDLName"]);
    if(option["name"] == "addDepartment" || option["name"] == "editDepartment") {
      (this.uiComponent.getServiceComponent() as Operation)
         .setComplexTypeUrl(this.fakeData());
        
    }
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
        let argumentOption;
        this.argumentOptions = [];
        let serviceArguments = JSON.parse(response["body"]);
        for (let index = 0; index < serviceArguments.length; index++) {
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
          this.serviceComponentPool.set(serviceComponent.name,true);
        }
        // serviceComponent has been in pool
        else {
          return;
        }

        let operation: IServiceEntry;
        if(serviceComponent.serviceID.toString().length > 0) {
          operation = this.uiComponent.getServiceComponent()
        }
        for(let index = 0;index < this.argumentOptions.length;index++)
          (operation as Operation).addArgument(this.argumentOptions[index]);
        this.store.dispatch(new PipelineCreateOperationAction(operation as Operation));
      },
        (err) => {
          console.log(err);
        })
  }

  queryService() {
    this.isQueryingService = true;
    this.serviceComponentService
      // .queryServices(this.uiComponent,2)
      .queryMatchedServices(this.uiComponent)
      .subscribe(
        (response) => {
          this.serviceOptions = JSON.parse(response["body"]);
          for (let index = 0; index < this.serviceOptions.length; index++) {
            this.serviceOptions[index]["argc"] = this.serviceOptions[index]["WSDLName"]
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
  
  fakeData() {
    return {
      "department": {
        url: "http://140.112.90.144:7122/InventorySystemBackendMarksTonyModify/ntu/csie/selab/inventorysystem/model/Department/initMethod",
        args: [
             {
                  name: "id",
                  type: "int",
                  url: "http://140.112.90.144:7122/InventorySystemBackendMarksTonyModify/ntu/csie/selab/inventorysystem/model/Department/setId-java_lang_Integer"
             },
             {
                  name: "description",
                  type: "String",
                  url: "http://140.112.90.144:7122/InventorySystemBackendMarksTonyModify/ntu/csie/selab/inventorysystem/model/Department/setDescription-java_lang_String"
             },
             {
                  name: "code",
                  type: "String",
                  url: "http://140.112.90.144:7122/InventorySystemBackendMarksTonyModify/ntu/csie/selab/inventorysystem/model/Department/setCode-java_lang_String"
             },
             {
                  name: "name",
                  type: "String",
                  url: "http://140.112.90.144:7122/InventorySystemBackendMarksTonyModify/ntu/csie/selab/inventorysystem/model/Department/setName-java_lang_String"
             },
             {
                  name: "tag",
                  type: "String",
                  url: "http://140.112.90.144:7122/InventorySystemBackendMarksTonyModify/ntu/csie/selab/inventorysystem/model/Department/setTag-java_lang_String"
             }
            ]
      }
    }
  }

  ngOnInit() {
  }
}