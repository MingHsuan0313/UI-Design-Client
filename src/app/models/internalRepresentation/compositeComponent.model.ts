import { ServiceComponentModel } from "../service-component-dependency";
import { UIComponent } from "./UIComponent.model";

export class CompositeComponent extends UIComponent {
   public componentList: UIComponent[];
}