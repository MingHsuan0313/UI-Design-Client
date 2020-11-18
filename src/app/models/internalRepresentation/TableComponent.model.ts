import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { BasicComponent } from "./BasicComponent.model";
import { UIComponentBuilder } from "../UIComponentBuilder";

export class TableComponent extends BasicComponent {
  headers: any[];
  rows: any[];

  constructor(uiComponentBuilder: UIComponentBuilder) {
    super(uiComponentBuilder);
    let properties = uiComponentBuilder.getProperties();
    if (properties != undefined) {
      this.headers = properties["headers"];
      this.rows = properties["rows"];
    }
  }

  setServiceComponent(serviceComponent: ServiceComponentModel): TableComponent{
    return this.uiComponentBuilder
      .setServiceComponet(serviceComponent)
      .buildTableComponent();
  }

  setName(name: string): TableComponent{
    return this.uiComponentBuilder
      .setName(name)
      .buildTableComponent();
  }

  setProperties(properties: Object): TableComponent{
    return this.uiComponentBuilder
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


  setUIComponent(properties) {
    if (properties != undefined) {
      this.name = properties["name"];
      this.headers = properties["headers"];
      this.rows = properties["rows"];
      this.category = "informative";
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