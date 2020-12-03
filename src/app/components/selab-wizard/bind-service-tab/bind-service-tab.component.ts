import { Component, Input, OnInit } from '@angular/core';
import { CompositeComponent } from 'src/app/models/internalRepresentation/CompositeComponent.model';
import { ServiceMappingType } from 'src/app/models/service-component-dependency';
import { Operation } from 'src/app/models/store/serviceEntry.model';
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
    (this.uiComponent.getServiceComponent() as Operation)
      .setClassName(option["className"])
      .setName(option["name"])
      .setServiceID(option["serviceID"])
    this.queryArguments();
  }
  
  update(uiComponent:UIComponent) {
    this.uiComponent = uiComponent;
  }

  chooseArgument(event, option,subComponent:UIComponent) {
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
      subComponent.getServiceComponent().setBind(true);
    else
      subComponent.getServiceComponent().setBind(false);
  }

  ngOnInit() {
  }
}