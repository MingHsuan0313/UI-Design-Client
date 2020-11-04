import { Component, Input, OnInit } from '@angular/core';
import { ServiceMappingType } from 'src/app/models/service-component-dependency';
import { UIComponent } from 'src/app/models/ui-component-dependency';

@Component({
  selector: 'bind-service-tab',
  templateUrl: './bind-service-tab.component.html',
  styleUrls: ['./bind-service-tab.component.css']
})
export class BindServiceTabComponent implements OnInit {
  @Input() uiComponent: UIComponent;
  serviceOptions: string[];
  isArgument: boolean;

  constructor() { }
  
  chooseService(event,option) {
    console.log("choose service");
  }
  
  chooseArgument(event,option) {
    console.log("choose option");
  }
  
  queryService() {
    console.log("query service");
  }
  
  toggleIsArgument(event,subComponent:UIComponent) {
    console.log("toggle is argument");
    console.log(event);
    console.log(subComponent);
    if(event)
      subComponent.getServiceComponent().setServiceType(ServiceMappingType["argument"]);
    else
      subComponent.getServiceComponent().setServiceType(ServiceMappingType["none"]);
  }

  ngOnInit() {
  }
}