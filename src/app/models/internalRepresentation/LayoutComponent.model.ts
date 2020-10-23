import { UIComponent } from "../ui-component-dependency";
import { CompositeComponent } from "./CompositeComponent.model";

export class LayoutComponent extends CompositeComponent {
    public componentList: UIComponent[];
    constructor(id:String,selector:String) {
       super();
       this.id = id;
       this.category = "layout";
       this.selector = selector;
       this.componentList = [];
       this.style = {};
       console.log("construct layout component " + id);
    }
}