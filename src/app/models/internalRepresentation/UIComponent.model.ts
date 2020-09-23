import { ServiceComponentModel } from "../service-component.model";

export interface UIComponent {
  x: String;
  y: String;
  width: String;
  height: String;
  id: String;
  selector: String;
  type: String;
  style: Object;
  layout: String;
  category: String;

  serviceComponent: ServiceComponentModel;

  add(component: UIComponent): void;
  remove(component: UIComponent): void;
  getInfo(): any;
}