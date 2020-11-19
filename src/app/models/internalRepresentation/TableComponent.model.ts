import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { BasicComponent } from "./BasicComponent.model";
import { UIComponentBuilder } from "../UIComponentBuilder";
import { UIComponentFactory } from "src/app/components/selab-wizard/uicomponent-factory";

export class TableComponent extends BasicComponent {
  headers: string;
  rows: string;

  constructor(uiComponentBuilder: UIComponentBuilder) {
    super(uiComponentBuilder);
    let properties = uiComponentBuilder.getProperties();
    if (properties != undefined) {
      this.headers = properties["headers"];
      this.rows = properties["rows"];
    }
  }

  setServiceComponent(serviceComponent: ServiceComponentModel): TableComponent{
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder

      .setServiceComponent(serviceComponent)
      .buildTableComponent();
  }

  setName(name: string): TableComponent{
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setName(name)
      .buildTableComponent();
  }

  setProperties(properties: Object): TableComponent{
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setProperties(properties)
      .buildTableComponent();
  }

  getProperties() {
    return [
      {
        "type": "String",
        "value": "name"
      },
      {
        "type": "String",
        "value": "headers"
      },
      {
        "type": "String",
        "value": "rows"
      }
    ]
  }
  
  getValue(part: string,index: number): string {
    if(part == "header") {
      return this.headers.split(" ")[index]    
    }
    else if(part == "row") {
      return this.rows.split(" ")[index]    
    }
  }

  add(component: UIComponent): void {
  }

  getInfo() {
    return {
      [this.getSelector().toString()]: {
        name: this.name,
        headers: this.headers,
        service: this.serviceComponent.getInfo()
      }
    };
  }

  remove(component: UIComponent): void {
  }
}