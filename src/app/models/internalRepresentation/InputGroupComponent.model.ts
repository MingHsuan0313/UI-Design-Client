import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { CompositeComponent } from "./CompositeComponent.model";

export class InputGroupComponent extends CompositeComponent{
  componentList: any[] = [];

  constructor(init?: Partial<InputGroupComponent>) {
    super();
    // Object.assign(this, init);
    this.type = "inputgroup";
    this.componentList = [];
    this.category = "input";
    this.serviceComponent = new ServiceComponentModel();
  }

  add(component: UIComponent): void {
    this.componentList.push(component);
  }

  getInfo(): any {
    return this;
  }

  remove(component: UIComponent): void {
  }
}