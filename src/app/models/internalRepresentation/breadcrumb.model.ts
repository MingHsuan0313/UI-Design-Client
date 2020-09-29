import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";

export class BreadcrumbComposite extends UIComponent {
  componentList: any[] = [];

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
