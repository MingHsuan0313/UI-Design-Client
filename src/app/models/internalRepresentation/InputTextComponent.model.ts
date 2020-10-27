import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { BasicComponent } from "./BasicComponent.model";

export class InputTextComponent extends BasicComponent{
  public typeInfo: String;  // e.g. input-text, input-password

  constructor(init?: Partial<InputTextComponent>) {
    super();
    // Object.assign(this, init);
    this.type = "input"
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