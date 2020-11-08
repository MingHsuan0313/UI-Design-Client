import { Component, Input, OnInit } from '@angular/core';
import { CompositeComponent } from 'src/app/models/internalRepresentation/CompositeComponent.model';
import { ServiceMappingType } from 'src/app/models/service-component-dependency';
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
  selectedService;

  isQueryingService: boolean;
  isArgument: boolean;

  constructor(private serviceComponentService:ServiceComponentService) {
    this.isQueryingService = false;
  }

  chooseService(event, option) {
    console.log("choose service");
    console.log(event);
    console.log(option);
    this.selectedService = option;
    this.uiComponent
      .getServiceComponent()
      .setServiceType(ServiceMappingType["service"])
      .setClassName(option["className"])
      .setName(option["name"])
      .setServiceID(option["serviceID"])

    this.queryArguments();
  }

  chooseArgument(event, option,subComponent:UIComponent) {
    console.log("choose option");
    console.log(option);
    subComponent.getServiceComponent()
      .setServiceType(ServiceMappingType["argument"])
      .setName(option)
  }
  
  queryArguments() {
    this.serviceComponentService
      .queryArgumentsByServiceID(this.uiComponent.getServiceComponent().getServiceID())
      .subscribe((response) => {
        console.log(this.uiComponent.getServiceComponent().getServiceID())
        console.log("get arguments");
        console.log(response["body"]);
        this.argumentOptions = JSON.parse(response["body"]);
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
      .queryServices(this.uiComponent,2)
      .subscribe(
        (response) => {
          console.log(response) ;
          console.log(JSON.parse(response["body"]));
          this.serviceOptions = JSON.parse(response["body"]);
          this.isQueryingService = false;
      },
        (err) => {
          console.log(err)
        }
      )
  }

  toggleIsArgument(event, subComponent: UIComponent) {
    if (event)
      subComponent.getServiceComponent().setServiceType(ServiceMappingType["argument"]);
    else
      subComponent.getServiceComponent().setServiceType(ServiceMappingType["none"]);
  }

  ngOnInit() {
  }
}