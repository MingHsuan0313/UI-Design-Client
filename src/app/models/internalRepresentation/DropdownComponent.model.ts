
import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { BasicComponent } from "./BasicComponent.model";

export class DropdownComponent extends BasicComponent {
  items: String;

  constructor(properties?) {
    super();
    if (properties != undefined) {
      this.items = properties["items"];
      this.name = properties["name"];
    }
    this.category = "informative";
    this.type = "dropdown";
    this.serviceComponent = new ServiceComponentModel();
  }

  setUIComponent(properties) {
    this.items = properties["items"];
    this.name = properties["name"];
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