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
   
   expandChildren() {
      let children = {};
      for(let index = 0;index < this.componentList.length;index++) {
          children[(this.componentList[index].getSelector()).toString()]
           = this.componentList[index]
              .getInfo()[this.componentList[index]
              .getSelector().toString()];
      }
      return children;
   }
}