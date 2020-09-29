import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";

export class Layout extends UIComponent {
  componentList: any[] = [];
  header: any[] = [];
  sidebar: any[] = [];
  footer: any[] = [];
  asidebar: any[] = [];

  constructor(init?: Partial<Layout>) {
    super();
    Object.assign(this, init);
    this.category = "layout";
    this.serviceComponent = new ServiceComponentModel();
  }

  add(component: UIComponent): void {
  }

  getInfo(): any {
    return this;
  }

  remove(component: UIComponent): void {
  }
}