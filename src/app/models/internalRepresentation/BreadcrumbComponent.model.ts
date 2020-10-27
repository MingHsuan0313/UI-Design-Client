import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { CompositeComponent } from "./CompositeComponent.model";

export class BreadcrumbComponent extends CompositeComponent{
  
  constructor(init?: Partial<BreadcrumbComponent>) {
    super();
    // Object.assign(this, init);
    this.componentList = [];
    this.category = "navigation";
    this.type = "breadcrumb";
    this.serviceComponent = new ServiceComponentModel();
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
