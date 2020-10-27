import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { BasicComponent } from "./BasicComponent.model";

export class TableComponent extends BasicComponent{
  headers: any[];
  rows: any[];

  constructor(init?: Partial<TableComponent>) {
    super();
    // Object.assign(this, init);
    this.category = "informative";
    this.type = "table";
    this.serviceComponent = new ServiceComponentModel();
  }

  add(component: UIComponent): void {
  }

  getInfo(): any {
    return this;
  }

  remove(component: UIComponent): void {
  }
}