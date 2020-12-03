import { Argument } from "../store/serviceEntry.model";
import { UIComponentBuilder } from "../UIComponentBuilder";
import { UIComponent } from "./UIComponent.model";

export class BasicComponent extends UIComponent {
    serviceComponent: Argument;
    constructor(uiComponentBuilder: UIComponentBuilder) {
        super(uiComponentBuilder);
        this.serviceComponent = new Argument();
    }
}