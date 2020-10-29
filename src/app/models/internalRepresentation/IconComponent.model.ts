import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { BasicComponent } from "./BasicComponent.model";
export class IconComponent extends BasicComponent {
  text: String;

  constructor(properties?) {
    super();
    if (properties != undefined) {
      this.name = properties["name"];
      this.text = properties["text"];
    }
    this.type = "icon";
    this.category = "informative";
    this.serviceComponent = new ServiceComponentModel();
  }

  setUIComponent(properties) {
    this.text = properties["text"];
    this.name = properties["name"];
  }

  add(component: UIComponent): void {
  }

  getInfo(): any {
    return this;
  }

  remove(component: UIComponent): void {
  }
}
