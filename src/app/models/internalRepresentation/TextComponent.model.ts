import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { BasicComponent } from "./BasicComponent.model";
export class TextComponent extends BasicComponent {
  text: String;
  href: String;

  constructor(properties?) {
    super();
    if(properties != undefined) {
      this.name = properties["name"];
      this.text = properties["text"];
      this.href = properties["href"];
    }
    this.category = "informative";
    this.type = "text";
    this.serviceComponent = new ServiceComponentModel();
  }

  setUIComponent(properties) {
     if(properties != undefined) {
      this.name = properties["name"];
      this.text = properties["text"];
      this.href = properties["href"];
    }
  }

  add(component: UIComponent): void {
  }

  getInfo(): any {
    return this;
  }

  remove(component: UIComponent): void {
  }
}