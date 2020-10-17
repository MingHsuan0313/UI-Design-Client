import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { BasicComponent } from "./basicComponent.model";
export class Text extends BasicComponent {
  text: String;
  href: String;

  constructor(init?: Partial<Text>) {
    super();
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