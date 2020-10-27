
import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { BasicComponent } from "./BasicComponent.model";

export class DropdownComponent extends BasicComponent{
  items: string;

  constructor(init?: Partial<DropdownComponent>) {
    super();
    // Object.assign(this, init);
    this.category = "informative";
    this.type = "dropdown";
    this.serviceComponent = new ServiceComponentModel();
  }

  add(component: UIComponent): void {
  }

  getInfo(): any {
    return this;
  }

  remove(component: UIComponent): void {
  }
  
  setItems(items: string) {
    this.items = items;
  }
}