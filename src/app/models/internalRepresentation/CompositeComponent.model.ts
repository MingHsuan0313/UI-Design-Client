import { ServiceComponentModel } from "../service-component-dependency";
import { UIComponent } from "./UIComponent.model";

export class CompositeComponent extends UIComponent {
   public componentList: UIComponent[];
   public getChildrenOptions(): string[]{ return [""]};
   public addSubComponent(uiComponent: UIComponent){
      this.componentList.push(uiComponent);
   }
   constructor() {
      super();
   }
}