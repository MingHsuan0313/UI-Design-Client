
import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { BasicComponent } from "./BasicComponent.model";

export class ButtonComponent extends BasicComponent {
  text: String;
  href: String;
  trigger: Boolean;

  constructor(properties?) {
    super();
    if (properties != undefined) {
      this.name = properties["name"];
      this.text = properties["text"];
      this.href = properties["href"];
    }
    this.category = "navigation";
    this.type = "button";
    this.serviceComponent = new ServiceComponentModel();
  }

  setUIComponent(properties) {
    this.name = properties["name"];
    this.text = properties["text"];
    this.href = properties["href"];
  }

  add(component: UIComponent): void {
  }

  getInfo(): any {
    return this;
  }

  getProperties() {
    return [
      {
        "type": "String",
        "value": "name"
      },
      {
        "type": "String",
        "value": "text"
      },
      {
        "type": "String",
        "value": "href"
      },
      {
        "type": "Boolean",
        "value": "trigger"
      },
    ]
  }

  remove(component: UIComponent): void {
  }
}