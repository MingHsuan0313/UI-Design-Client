import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { CompositeComponent } from "./CompositeComponent.model";

export class CardComponent extends CompositeComponent{
  header: String;

  constructor(init?: Partial<CardComponent>) {
    super();
    Object.assign(this, init);
    this.componentList = [];
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