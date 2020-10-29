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

  getInfo(): any {
    return this;
  }

  remove(component: UIComponent): void {
  }
}