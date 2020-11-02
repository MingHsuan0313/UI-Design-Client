import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { CompositeComponent } from "./CompositeComponent.model";

export class InputGroupComponent extends CompositeComponent {
  componentList: any[] = [];

  constructor(properties?) {
    super();
    if (properties != undefined) {
      this.name = properties["name"];
    }
    this.type = "inputgroup";
    this.componentList = [];
    this.category = "input";
    this.serviceComponent = new ServiceComponentModel();
  }

  setUIComponent(properties) {
    this.name = properties["name"];
  }

  getProperties() {
    return [
      {
        "type": "String",
        "value": "name"
      }
    ]
  }
  
  getChildrenOptions() {
    return ["text","button","icon","dropdown"];
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