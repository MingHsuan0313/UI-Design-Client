import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { CompositeComponent } from "./compositeComponent.model";

export class BreadcrumbComposite extends CompositeComponent{

  constructor(init?: Partial<BreadcrumbComposite>) {
    super();
    Object.assign(this, init);
    this.category = "navigation";
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
