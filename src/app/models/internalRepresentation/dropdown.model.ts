
import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { BasicComponent } from "./basicComponent.model";

export class Dropdown extends BasicComponent{
  items: any[];

  constructor(init?: Partial<Dropdown>) {
    super();
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