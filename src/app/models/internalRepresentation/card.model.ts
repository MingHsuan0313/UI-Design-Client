import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { CompositeComponent } from "./compositeComponent.model";

export class CardComposite extends CompositeComponent{
  header: String;

  constructor(init?: Partial<CardComposite>) {
    super();
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