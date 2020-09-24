import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";

export class CardComposite implements UIComponent {
  x: String;
  y: String;
  width: String;
  height: String;
  id: String;
  selector: String;
  type: String;
  style: String;
  layout: String;
  header: String;
  componentList: any[] = [];

  category: String;
  serviceComponent: ServiceComponentModel;
  name: String;

  constructor(init?: Partial<CardComposite>) {
    Object.assign(this, init);
    this.category = "informative";
    this.serviceComponent = new ServiceComponentModel();
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