import { ArgumentModel } from "../service-component-dependency";
import { UIComponentBuilder } from "../../components/selab-wizard/UIComponentBuilder";
import { UIComponent } from "./UIComponent.model";

export class BasicComponent extends UIComponent {
    serviceComponent: ArgumentModel;
    constructor(uiComponentBuilder: UIComponentBuilder) {
        super(uiComponentBuilder);
        this.serviceComponent = new ArgumentModel();
    }
}