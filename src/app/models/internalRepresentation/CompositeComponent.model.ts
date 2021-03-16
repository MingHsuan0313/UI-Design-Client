import { ServiceComponentModel } from "../service-component-dependency";
import { UIComponentBuilder } from "../../components/selab-wizard/UIComponentBuilder";
import { UIComponent } from "./UIComponent.model";

export class CompositeComponent extends UIComponent {
   public componentList: UIComponent[];
   public serviceComponent: ServiceComponentModel;

   constructor(uiComponentBuilder: UIComponentBuilder) {
      super(uiComponentBuilder);
   }

   getChildrenOptions(): string[] { return [""] };

   addSubComponent(uiComponent: UIComponent): any {
      this.componentList.push(uiComponent);
      return this;
   }

   expandChildren() {
      let children = {};
      for (let index = 0; index < this.componentList.length; index++) {
         children[(this.componentList[index].getSelector()).toString()]
            = this.componentList[index]
               .getInfo()[this.componentList[index]
                  .getSelector().toString()];
      }
      return children;
   }
}