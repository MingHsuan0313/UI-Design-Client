import { UIComponent } from "../ui-component-dependency";
import { CompositeComponent } from "./compositeComponent.model";

export class LayoutComponent extends CompositeComponent {
    public componentList: UIComponent[];
}