import { UIComponent } from "../ui-component-dependency";
import { UIComponentBuilder } from "../UIComponentBuilder";
import { CompositeComponent } from "./CompositeComponent.model";

export class LayoutComponent extends CompositeComponent {
    public componentList: UIComponent[];
    constructor(uiComponentBuilder: UIComponentBuilder) {
       super(uiComponentBuilder);
       this.componentList = uiComponentBuilder.componentList;
    }
}