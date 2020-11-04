import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { CompositeComponent } from "./CompositeComponent.model";

export class BreadcrumbComponent extends CompositeComponent {

  constructor(properties?) {
    super();
    if (properties != undefined) {
      this.name = properties["name"];
    }
    this.componentList = [];
    this.category = "navigation";
    this.type = "breadcrumb";
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
    return ["text"];
  }

  add(component: UIComponent): void {
    this.componentList.push(component);
  }

  getInfo() {
    return {
      name: this.name,
      service: this.serviceComponent.getInfo(),
      children: this.expandChildren()
    }
  }

  remove(component: UIComponent): void {
  }
}
