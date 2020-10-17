import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { BasicComponent } from "./basicComponent.model";

export class InputText extends BasicComponent{
  public typeInfo: String;  // e.g. input-text, input-password

  constructor(init?: Partial<InputText>) {
    super();
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