import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { CompositeComponent } from "./CompositeComponent.model";

export class CardComponent extends CompositeComponent {
  header: String;

  constructor(properties?) {
    super();
    if (properties) {
      this.header = properties["header"];
      this.name = properties["name"];
    }
    this.componentList = [];
    this.category = "informative";
    this.type = "card";
    this.serviceComponent = new ServiceComponentModel();
  }

  setUIComponent(properties) {
    this.header = properties["header"];
    this.name = properties["name"];
  }

  add(component: any): void {
    this.componentList.push(component);
  }

  getInfo(): any {
    return this;
  }

  remove(component: UIComponent): void {
  }
}