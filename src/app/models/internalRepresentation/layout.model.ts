import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../service-component.model";

export class Layout implements UIComponent {
  x: String;
  y: String;
  width: String;
  height: String;
  id: String;
  selector: String;
  type: String;       // layout1, layout2, ...
  style: String;
  layout: String;
  componentList: any[] = [];
  header: any[] = [];
  sidebar: any[] = [];
  footer: any[] = [];
  asidebar: any[] = [];
  category: String;

  serviceComponent: ServiceComponentModel;

  constructor(init?: Partial<Layout>) {
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