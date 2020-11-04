import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { BasicComponent } from "./BasicComponent.model";

export class InputTextComponent extends BasicComponent {
  public typeInfo: String;  // e.g. input-text, input-password
  public label: String;

  constructor(properties?) {
    super();
    if (properties != undefined) {
      this.typeInfo = properties["typeInfo"];
      this.label = properties["name"];
      this.name = properties["name"];
    }

    this.type = "input"
    this.category = "input";
    this.serviceComponent = new ServiceComponentModel();
  }

  getProperties() {
    return [
      {
        "type": "String",
        "value": "name"
      },
      {
        "type": "String",
        "value": "label"
      }
    ]
  }

  setUIComponent(properties) {
    this.typeInfo = properties["typeInfo"];
    this.label = properties["name"];
    this.name = properties["name"];
  }

  add(component: UIComponent): void {
  }

  getInfo(): any {
    return {
      [this.getSelector().toString()]: {
        name: this.name,
        label: this.label,
        service: this.serviceComponent.getInfo()
      }
    }
  }

  remove(component: UIComponent): void {
  }
}