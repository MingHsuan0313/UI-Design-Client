import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CompositeComponent } from 'src/app/models/internalRepresentation/CompositeComponent.model';
import { ServiceMappingType } from 'src/app/models/service-component-dependency';
import { PipelineCreateOperationAction } from 'src/app/models/store/actions/pipelineTask.action';
import { AppState } from 'src/app/models/store/app.state';
import { Argument, ServiceComponent } from 'src/app/models/store/serviceEntry.model';
import { UIComponent } from 'src/app/models/ui-component-dependency';
import { UIComponentBuilder } from 'src/app/models/UIComponentBuilder';
import ServiceComponentService from 'src/app/services/serviceComponent/service-component.service';

@Component({
  selector: 'bind-service-tab',
  templateUrl: './bind-service-tab.component.html',
  styleUrls: ['./bind-service-tab.component.css']
})
export class BindServiceTabComponent implements OnInit {
  @Input() uiComponentBuilder: UIComponentBuilder;
  serviceOptions: any[];
  argumentOptions: any[];
  serviceComponentPool: Map<String, Boolean>; // check is serviceComponent has in pool
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

  async chooseService(event, option) {
    console.log("choose service");
    this.selectedService = option;
    // if((this.uiComponentBuilder.serviceComponent as ServiceComponent).serviceID != undefined) {
    //   this.uiComponentBuilder.setServiceComponent(new ServiceComponent());
    //   this.uiComponent = this.uiComponent.setServiceComponent(new ServiceComponent());
    // }
    // console.log(this.uiComponent);
    let serviceComponent = new ServiceComponent();
    serviceComponent.setClassName(option["className"])
      .setName(option["name"])
      .setServiceID(option["serviceID"])
      .setHttpMethod(option["httpMethod"])
      .setWSDLName(option["WSDLName"])
      .setUrl();
    this.uiComponentBuilder.setServiceComponent(serviceComponent);
    if (option["name"] == "addDepartment" || option["name"] == "editDepartment") {
        (this.uiComponentBuilder
          .getServiceComponent() as ServiceComponent)
          .setComplexTypeUrl(this.fakeData());
    }
    this.queryArguments();
  }

  chooseArgument(event, option, subComponent: UIComponent) {
    console.log("choose option");
    console.log(option);
    (subComponent.serviceComponent as Argument)
      .setName(option["name"])
  }

  queryArguments() {
    console.log("query arguments")
    this.serviceComponentService
      .queryArgumentsByServiceID((this.uiComponentBuilder.getServiceComponent() as ServiceComponent).serviceID)
      .subscribe(async (response) => {
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

        let operation: ServiceComponent;
        if ((this.uiComponentBuilder.getServiceComponent() as ServiceComponent).serviceID.toString().length > 0) {
          operation = (this.uiComponentBuilder.getServiceComponent() as ServiceComponent);
        }
        for (let index = 0; index < this.argumentOptions.length; index++)
          (operation as ServiceComponent).addArgument(this.argumentOptions[index]);
        this.store.dispatch(new PipelineCreateOperationAction(this.uiComponentBuilder.getServiceComponent() as ServiceComponent));
      },
        (err) => {
          console.log(err);
      })
  }

  queryService() {
    this.isQueryingService = true;
    this.serviceComponentService
      // .queryServices(this.uiComponent,2)
      .queryMatchedServices(this.uiComponentBuilder)
      .subscribe(
        (response) => {
          console.log("queryService result")
          console.log(response["body"])
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
        initUrl: "ntu/csie/selab/inventorysystem/model/Department/initMethod",
        args: [
          {
            name: "description",
            type: "string",
            setterUrl: "ntu/csie/selab/inventorysystem/model/Department/setDescription-java_lang_String"
          },
          {
            name: "code",
            type: "string",
            setterUrl: "ntu/csie/selab/inventorysystem/model/Department/setCode-java_lang_String"
          },
          {
            name: "name",
            type: "string",
            setterUrl: "ntu/csie/selab/inventorysystem/model/Department/setName-java_lang_String"
          },
          {
            name: "tag",
            type: "string",
            setterUrl: "ntu/csie/selab/inventorysystem/model/Department/setTag-java_lang_String"
          }
        ]
      }
    }
  }

  ngOnInit() {
  }
}