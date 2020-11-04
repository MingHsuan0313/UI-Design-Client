import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { BasicComponent } from "./BasicComponent.model";

export class TableComponent extends BasicComponent {
  headers: any[];
  rows: any[];

  constructor(properties?) {
    super();
    if (properties != undefined) {
      this.name = properties["name"];
      this.headers = properties["headers"];
      this.rows = properties["rows"];
      this.category = "informative";
    }
    this.type = "table";
    this.serviceComponent = new ServiceComponentModel();
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
        service:this.serviceComponent.getInfo()
      }
    };
  }

  remove(component: UIComponent): void {
  }
}