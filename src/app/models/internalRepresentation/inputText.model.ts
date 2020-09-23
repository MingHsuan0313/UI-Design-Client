import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../service-component.model";

export class InputText implements UIComponent {
  x: String;
  y: String;
  width: String;
  height: String;
  id: String;
  selector: String;
  type: String;
  style: String;
  layout: String;
  typeInfo: String;  // e.g. input-text, input-password
  category: String;

  serviceComponent: ServiceComponentModel;

  constructor(init?: Partial<InputText>) {
    Object.assign(this, init);
    this.category = "input";
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