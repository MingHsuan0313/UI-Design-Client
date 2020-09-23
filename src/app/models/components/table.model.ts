import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../service-component.model";

export class Table implements UIComponent {
  x: String;
  y: String;
  width: String;
  height: String;
  id: String;
  selector: String;
  type: String;
  style: String;
  layout: String;
  headers: any[];
  rows: any[];
  category: String;

  serviceComponent: ServiceComponentModel;

  constructor(init?: Partial<Table>) {
    Object.assign(this, init);
    this.category = "informative";
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