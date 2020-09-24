import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
export class Text implements UIComponent {
  x: String;
  y: String;
  width: String;
  height: String;
  id: String;
  selector: String;
  type: String;
  style: String;
  layout: String;
  text: String;
  href: String;

  category: String;
  serviceComponent: ServiceComponentModel;
  name: String;

  constructor(init?: Partial<Text>) {
    Object.assign(this, init);
    this.category = "informative";
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