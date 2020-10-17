import { UIComponent } from "../ui-component-dependency";
import { CompositeComponent } from "./compositeComponent.model";

export class LayoutComponent extends CompositeComponent {
    public componentList: UIComponent[];
    constructor(id:String,selector:String) {
       super();
       this.id = id;
       this.category = "layout";
       this.selector = selector;
       console.log("construct layout component " + id);
    }
}